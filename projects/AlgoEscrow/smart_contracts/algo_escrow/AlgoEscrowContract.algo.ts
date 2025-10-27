/* ============================================================
 * AlgoEscrowContract.algo.ts
 * Compatible with puya-ts 1.0.0-beta.74
 * Implements milestone-based escrow logic using Algorand TypeScript
 * ============================================================
 */

import {
  Contract,
  GlobalState,
  uint64,
  bytes,
  assert,
  log,
  Bytes,
  Account,
  Txn,
  Global,
  itxn,
} from '@algorandfoundation/algorand-typescript';
import { Address } from '@algorandfoundation/algorand-typescript/arc4';

/* ============================================================
 * CONTRACT DEFINITION
 * ============================================================
 */
export class AlgoEscrowContract extends Contract {
  // ------------------------------------------------------------
  // GLOBAL STATE
  // ------------------------------------------------------------
  buyer = GlobalState<Account>();
  seller = GlobalState<Account>();
  arbiter = GlobalState<Account>();
  totalAmount = GlobalState<uint64>();
  releasedAmount = GlobalState<uint64>();
  totalMilestones = GlobalState<uint64>();
  completedMilestones = GlobalState<uint64>();
  status = GlobalState<bytes>();
  createdAt = GlobalState<uint64>();
  lastUpdated = GlobalState<uint64>();

  /* ============================================================
   * CREATE ESCROW
   * ============================================================
   * Buyer initializes escrow with milestone count and participants.
   */
  createEscrow(
    buyer: Account,
    seller: Account,
    arbiter: Account,
    totalMilestones: uint64
  ): void {
    assert(Txn.sender === buyer, 'Only buyer can create escrow');
    assert(totalMilestones > 0, 'Must have milestones');

    this.buyer.value = buyer;
    this.seller.value = seller;
    this.arbiter.value = arbiter;
    this.totalMilestones.value = totalMilestones;
    this.completedMilestones.value = 0 as uint64;
    this.releasedAmount.value = 0 as uint64;
    this.status.value = Bytes('active');
    this.createdAt.value = Global.latestTimestamp;
    this.lastUpdated.value = Global.latestTimestamp;

    log('EscrowCreated');
  }

  /* ============================================================
   * APPROVE MILESTONE
   * ============================================================
   * Buyer approves a milestone and releases proportional funds.
   */
  approveMilestone(milestoneIndex: uint64): void {
    assert(Txn.sender === this.buyer.value, 'Only buyer can approve milestone');
    assert(
      this.status.value === Bytes('active') ||
        this.status.value === Bytes('milestone_completed'),
      'Invalid status'
    );
    assert(
      milestoneIndex === this.completedMilestones.value,
      'Wrong milestone index'
    );
    assert(
      this.completedMilestones.value < this.totalMilestones.value,
      'All milestones done'
    );

    const paymentAmount: uint64 =
      (this.totalAmount.value / this.totalMilestones.value) as uint64;

    itxn.payment({
      receiver: this.seller.value,
      amount: paymentAmount,
      fee: 0,
    }).submit();

    this.completedMilestones.value += 1 as uint64;
    this.releasedAmount.value += paymentAmount;
    this.lastUpdated.value = Global.latestTimestamp;

    if (this.completedMilestones.value === this.totalMilestones.value) {
      this.status.value = Bytes('completed');
      log('EscrowCompleted');
    } else {
      this.status.value = Bytes('milestone_completed');
      log('MilestoneApproved');
    }
  }

  /* ============================================================
   * OPEN DISPUTE
   * ============================================================
   * Either buyer or seller can flag the contract as disputed.
   */
  openDispute(): void {
    assert(
      Txn.sender === this.buyer.value || Txn.sender === this.seller.value,
      'Only participants can dispute'
    );
    assert(this.status.value === Bytes('active'), 'Can dispute only active');
    this.status.value = Bytes('disputed');
    this.lastUpdated.value = Global.latestTimestamp;
    log('DisputeOpened');
  }

  /* ============================================================
   * RESOLVE DISPUTE
   * ============================================================
   * Arbiter resolves by distributing remaining funds.
   */
  resolveDispute(releaseToSeller: uint64, refundToBuyer: uint64): void {
    assert(Txn.sender === this.arbiter.value, 'Only arbiter can resolve');
    assert(this.status.value === Bytes('disputed'), 'No dispute to resolve');

    const remaining: uint64 =
      (this.totalAmount.value - this.releasedAmount.value) as uint64;

    assert(
      releaseToSeller + refundToBuyer === remaining,
      'Amounts must balance'
    );

    if (releaseToSeller > 0) {
      itxn.payment({
        receiver: this.seller.value,
        amount: releaseToSeller,
        fee: 0,
      }).submit();
    }

    if (refundToBuyer > 0) {
      itxn.payment({
        receiver: this.buyer.value,
        amount: refundToBuyer,
        fee: 0,
      }).submit();
    }

    this.releasedAmount.value = this.totalAmount.value;
    this.status.value = Bytes('completed');
    this.lastUpdated.value = Global.latestTimestamp;

    log('DisputeResolved');
  }

  /* ============================================================
   * CANCEL AND REFUND
   * ============================================================
   * Buyer can cancel escrow if no milestones approved.
   */
  cancelAndRefund(): void {
    assert(Txn.sender === this.buyer.value, 'Only buyer can cancel');
    assert(this.status.value === Bytes('active'), 'Not active escrow');
    assert(this.releasedAmount.value === 0, 'Funds already released');

    itxn.payment({
      receiver: this.buyer.value,
      amount: this.totalAmount.value,
      fee: 0,
    }).submit();

    this.status.value = Bytes('cancelled');
    this.lastUpdated.value = Global.latestTimestamp;
    log('EscrowCancelled');
  }

  /* ============================================================
   * VIEW: getStatus
   * ============================================================
   * Returns escrow state details for front-end consumption.
   */
  getStatus(): [bytes, uint64, uint64, uint64, uint64, uint64] {
    const remaining: uint64 =
      (this.totalAmount.value - this.releasedAmount.value) as uint64;

    return [
      this.status.value,
      this.completedMilestones.value,
      this.totalMilestones.value,
      this.releasedAmount.value,
      remaining,
      this.lastUpdated.value,
    ];
  }

  /* ============================================================
   * VIEW: getParticipants
   * ============================================================
   * Converts Account types to ARC-4 Address for ABI safety.
   */
  getParticipants(): [Address, Address, Address] {
    return [
      new Address(this.buyer.value),
      new Address(this.seller.value),
      new Address(this.arbiter.value),
    ];
  }
}
