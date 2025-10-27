/**
 * AlgoEscrow Pro - Milestone-Based Escrow Smart Contract
 * ------------------------------------------------------
 * TEALScript Production Implementation
 *
 * Features:
 * ✅ Full access control (buyer/seller/arbiter)
 * ✅ Milestone-based release logic
 * ✅ Dispute handling and resolution
 * ✅ Cancel and refund support
 * ✅ Inner transactions for payments
 * ✅ Group validation for escrow funding
 * ✅ Event logs for off-chain indexing
 * 
 * DEPLOYMENT NOTE:
 * This file contains the TEALScript contract source as a string export.
 * To deploy, copy this to an AlgoKit project and compile with algokit.
 */

// ============================================================
// TYPESCRIPT INTERFACE (for frontend clients)
// ============================================================

export interface AlgoEscrowState {
  buyer: string;
  seller: string;
  arbiter: string;
  totalAmount: number;
  releasedAmount: number;
  totalMilestones: number;
  completedMilestones: number;
  status: 'active' | 'milestone_completed' | 'disputed' | 'completed' | 'refunded';
  createdAt: number;
  lastUpdated: number;
}

// ============================================================
// CONTRACT SOURCE (TEALScript)
// ============================================================

export const AlgoEscrowContractSource = `
import {
  Contract,
  GlobalStateKey,
  PayTxn,
  Address,
  sendPayment,
  globals,
  abi,
  assert,
  log,
} from '@algorandfoundation/tealscript';

export class AlgoEscrowContract extends Contract {
  // ============================================================
  // GLOBAL STATE
  // ============================================================
  buyer = GlobalStateKey<Address>('buyer');
  seller = GlobalStateKey<Address>('seller');
  arbiter = GlobalStateKey<Address>('arbiter');
  totalAmount = GlobalStateKey<uint64>('totalAmount');
  releasedAmount = GlobalStateKey<uint64>('releasedAmount');
  totalMilestones = GlobalStateKey<uint64>('totalMilestones');
  completedMilestones = GlobalStateKey<uint64>('completedMilestones');
  status = GlobalStateKey<bytes>('status');
  createdAt = GlobalStateKey<uint64>('createdAt');
  lastUpdated = GlobalStateKey<uint64>('lastUpdated');

  // ============================================================
  // METHOD: createEscrow
  // ============================================================
  createEscrow(
    buyer: Address,
    seller: Address,
    arbiter: Address,
    totalMilestones: uint64,
    payment: PayTxn
  ): void {
    // --- Access Control ---
    assert(this.txn.sender === buyer, 'Only buyer can create escrow');

    // --- Transaction Group Validation ---
    assert(globals.groupSize === 2, 'Group must include payment + app call');
    assert(payment.receiver === this.app.address, 'Payment must go to contract');
    assert(payment.amount > 0, 'Payment must be positive');
    assert(totalMilestones > 0, 'Must have milestones');

    // --- Initialize State ---
    this.buyer.value = buyer;
    this.seller.value = seller;
    this.arbiter.value = arbiter;
    this.totalAmount.value = payment.amount;
    this.releasedAmount.value = 0;
    this.totalMilestones.value = totalMilestones;
    this.completedMilestones.value = 0;
    this.status.value = 'active';
    this.createdAt.value = globals.latestTimestamp;
    this.lastUpdated.value = globals.latestTimestamp;

    log('EscrowCreated');
  }

  // ============================================================
  // METHOD: approveMilestone
  // ============================================================
  approveMilestone(milestoneIndex: uint64): void {
    // --- Access Control ---
    assert(this.txn.sender === this.buyer.value, 'Only buyer can approve milestone');

    // --- State Validation ---
    assert(
      this.status.value === 'active' || this.status.value === 'milestone_completed',
      'Invalid status'
    );
    assert(milestoneIndex === this.completedMilestones.value, 'Wrong milestone index');
    assert(this.completedMilestones.value < this.totalMilestones.value, 'All milestones done');

    // --- Calculate Payment ---
    const paymentAmount = this.totalAmount.value / this.totalMilestones.value;

    // --- Inner Transaction: Pay Seller ---
    sendPayment({
      receiver: this.seller.value,
      amount: paymentAmount,
      fee: globals.minTxnFee,
    });

    // --- Update State ---
    this.completedMilestones.value += 1;
    this.releasedAmount.value += paymentAmount;
    this.lastUpdated.value = globals.latestTimestamp;

    if (this.completedMilestones.value === this.totalMilestones.value) {
      this.status.value = 'completed';
      log('EscrowCompleted');
    } else {
      this.status.value = 'milestone_completed';
      log('MilestoneApproved');
    }
  }

  // ============================================================
  // METHOD: requestMilestoneApproval
  // ============================================================
  requestMilestoneApproval(milestoneIndex: uint64, deliverableHash: bytes): void {
    // --- Access Control ---
    assert(this.txn.sender === this.seller.value, 'Only seller can request approval');

    // --- State Validation ---
    assert(
      this.status.value === 'active' || this.status.value === 'milestone_completed',
      'Invalid status'
    );
    assert(milestoneIndex === this.completedMilestones.value, 'Must request next milestone');

    // --- Update Timestamp ---
    this.lastUpdated.value = globals.latestTimestamp;

    // --- Emit Events ---
    log('MilestoneApprovalRequested');
    log(deliverableHash);
  }

  // ============================================================
  // METHOD: raiseDispute
  // ============================================================
  raiseDispute(reason: bytes): void {
    // --- Access Control ---
    assert(
      this.txn.sender === this.buyer.value || this.txn.sender === this.seller.value,
      'Only buyer or seller can dispute'
    );

    // --- State Validation ---
    assert(
      this.status.value === 'active' || this.status.value === 'milestone_completed',
      'Cannot dispute now'
    );

    // --- Update State ---
    this.status.value = 'disputed';
    this.lastUpdated.value = globals.latestTimestamp;

    log('DisputeRaised');
    log(reason);
  }

  // ============================================================
  // METHOD: resolveDispute
  // ============================================================
  resolveDispute(releaseToSeller: uint64, refundToBuyer: uint64): void {
    // --- Access Control ---
    assert(this.txn.sender === this.arbiter.value, 'Only arbiter can resolve dispute');
    assert(this.status.value === 'disputed', 'No dispute to resolve');

    const remaining = this.totalAmount.value - this.releasedAmount.value;
    assert(releaseToSeller + refundToBuyer === remaining, 'Amounts must balance');

    // --- Inner Transactions ---
    if (releaseToSeller > 0) {
      sendPayment({
        receiver: this.seller.value,
        amount: releaseToSeller,
        fee: globals.minTxnFee,
      });
    }

    if (refundToBuyer > 0) {
      sendPayment({
        receiver: this.buyer.value,
        amount: refundToBuyer,
        fee: globals.minTxnFee,
      });
    }

    // --- Update State ---
    this.releasedAmount.value = this.totalAmount.value;
    this.status.value = 'completed';
    this.lastUpdated.value = globals.latestTimestamp;

    log('DisputeResolved');
  }

  // ============================================================
  // METHOD: cancelAndRefund
  // ============================================================
  cancelAndRefund(): void {
    // --- Access Control ---
    assert(this.txn.sender === this.buyer.value, 'Only buyer can cancel');
    assert(this.status.value === 'active', 'Not active');
    assert(this.completedMilestones.value === 0, 'Work started');

    // --- Calculate Refund ---
    const fee = globals.minTxnFee * 2;
    const refundAmount = this.totalAmount.value - fee;

    sendPayment({
      receiver: this.buyer.value,
      amount: refundAmount,
      fee: globals.minTxnFee,
    });

    // --- Update State ---
    this.releasedAmount.value = this.totalAmount.value;
    this.status.value = 'refunded';
    this.lastUpdated.value = globals.latestTimestamp;

    log('EscrowRefunded');
  }

  // ============================================================
  // READ-ONLY METHODS (ABI)
  // ============================================================

  @abi.readonly
  getStatus(): [bytes, uint64, uint64, uint64, uint64, uint64] {
    const remaining = this.totalAmount.value - this.releasedAmount.value;
    return [
      this.status.value,
      this.completedMilestones.value,
      this.totalMilestones.value,
      this.releasedAmount.value,
      remaining,
      this.lastUpdated.value,
    ];
  }

  @abi.readonly
  getParticipants(): [Address, Address, Address] {
    return [this.buyer.value, this.seller.value, this.arbiter.value];
  }
}
`;

// ============================================================
// DEPLOYMENT INSTRUCTIONS
// ============================================================

export const DEPLOYMENT_GUIDE = `
===================================================================
PRODUCTION DEPLOYMENT GUIDE
===================================================================

STEP 1: Create AlgoKit Project
-------------------------------
$ algokit init
# Select: Smart Contracts + TypeScript
# Project name: algoescrow-contracts

STEP 2: Add Contract
-------------------------------
# Copy the contract source above to:
# algoescrow-contracts/contracts/AlgoEscrow.ts

STEP 3: Compile Contract
-------------------------------
$ cd algoescrow-contracts
$ algokit compile contracts/AlgoEscrow.ts

# This generates:
# - AlgoEscrow.approval.teal
# - AlgoEscrow.clear.teal
# - application.json (ABI)

STEP 4: Deploy to TestNet
-------------------------------
$ algokit deploy

# Follow prompts:
# - Network: TestNet
# - Creator account: [your account]
# - Fund with: TestNet dispenser

# Result: App ID (e.g., 12345678)

STEP 5: Generate TypeScript Client
-------------------------------
$ algokit generate client contracts/AlgoEscrow.ts

# This updates:
# src/contracts/clients/AlgoEscrowClient.ts
# with proper type-safe methods

STEP 6: Update Frontend
-------------------------------
# Update src/utils/algorand.ts with:
export const ESCROW_APP_ID = 12345678; // Your deployed app ID

===================================================================
SECURITY FEATURES IMPLEMENTED
===================================================================

✅ ACCESS CONTROL:
   - createEscrow: Only buyer
   - approveMilestone: Only buyer
   - requestMilestoneApproval: Only seller
   - raiseDispute: Buyer or seller
   - resolveDispute: Only arbiter
   - cancelAndRefund: Only buyer

✅ PAYMENT LOGIC (Inner Transactions):
   - approveMilestone: Releases payment to seller
   - resolveDispute: Splits remaining funds
   - cancelAndRefund: Refunds with small fee

✅ VALIDATION:
   - Transaction group validation on creation
   - Status checks before operations
   - Milestone sequence enforcement
   - Balance verification

✅ EVENT EMISSION:
   - EscrowCreated
   - MilestoneApprovalRequested
   - MilestoneApproved
   - EscrowCompleted
   - DisputeRaised
   - DisputeResolved
   - EscrowRefunded
`;