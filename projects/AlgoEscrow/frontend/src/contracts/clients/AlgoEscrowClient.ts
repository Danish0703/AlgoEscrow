// Client for AlgoEscrow Smart Contract
// Follows AlgoKit patterns with typed methods

import algosdk from 'algosdk';

interface ClientConfig {
  sender: {
    addr: string;
    signer: algosdk.TransactionSigner;
  };
  resolveBy: 'id';
  id: number;
}

export interface EscrowStatus {
  status: 'active' | 'milestone_completed' | 'disputed' | 'completed' | 'refunded';
  completed: number;
  total: number;
  released: number;
  remaining: number;
  lastUpdated: number;
}

export interface CreateEscrowParams {
  seller: string;
  arbiter: string;
  totalMilestones: number;
  paymentAmount: number;
}

export interface EscrowParticipants {
  buyer: string;
  seller: string;
  arbiter: string;
}

/**
 * Typed client for AlgoEscrow smart contract
 * Provides methods to interact with the deployed escrow contract
 */
export class AlgoEscrowClient {
  private config: ClientConfig;
  private algodClient: algosdk.Algodv2;
  private appId: number;
  private sender: string;
  private signer: algosdk.TransactionSigner;

  constructor(config: ClientConfig, algodClient: algosdk.Algodv2) {
    this.config = config;
    this.algodClient = algodClient;
    this.appId = config.id;
    this.sender = config.sender.addr;
    this.signer = config.sender.signer;
  }

  /**
   * Build and send an application call transaction
   */
  private async callMethod(
    method: string,
    args: (Uint8Array | number)[]
  ): Promise<string> {
    const suggestedParams = await this.algodClient.getTransactionParams().do();
    
    // Encode method name as bytes
    const methodBytes = new Uint8Array(Buffer.from(method));

    // Build app call transaction
    const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
      sender: this.sender,
      appIndex: this.appId,
      appArgs: [methodBytes, ...args.map(arg => 
        arg instanceof Uint8Array ? arg : algosdk.encodeUint64(arg)
      )],
      suggestedParams,
    });

    // Sign transaction
    const signedTxn = await this.signer([appCallTxn], [0]);
    
    // Submit to network
    const response = await this.algodClient.sendRawTransaction(signedTxn).do();
    const txId = response.txid || appCallTxn.txID();
    
    // Wait for confirmation
    await algosdk.waitForConfirmation(this.algodClient, txId, 4);
    
    return txId;
  }

  /**
   * Read global state from the application
   */
  private async readGlobalState(): Promise<Record<string, any>> {
    const appInfo = await this.algodClient.getApplicationByID(this.appId).do();
    const globalState: Record<string, any> = {};
    
    if (appInfo.params['global-state']) {
      for (const item of appInfo.params['global-state']) {
        const key = Buffer.from(item.key, 'base64').toString();
        let value: any;
        
        if (item.value.type === 1) {
          // bytes
          value = Buffer.from(item.value.bytes, 'base64').toString();
        } else {
          // uint
          value = item.value.uint;
        }
        
        globalState[key] = value;
      }
    }
    
    return globalState;
  }

  /**
   * Create a new escrow with milestone-based payments
   * Note: This creates the contract instance. In production, contract deployment
   * happens separately via AlgoKit, and this would be the initialization call.
   */
  async createEscrow(params: CreateEscrowParams): Promise<{ appId: number; txId: string }> {
    console.log('📝 Creating escrow contract...');
    
    const suggestedParams = await this.algodClient.getTransactionParams().do();
    
    // Create payment transaction for funding
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: this.sender,
      receiver: algosdk.getApplicationAddress(this.appId),
      amount: params.paymentAmount,
      suggestedParams,
    });

    // Create app call for initialization
    const createArgs = [
      algosdk.decodeAddress(this.sender).publicKey, // buyer
      algosdk.decodeAddress(params.seller).publicKey, // seller
      algosdk.decodeAddress(params.arbiter).publicKey, // arbiter
      params.totalMilestones,
      params.paymentAmount,
    ];

    const txId = await this.callMethod('create_escrow', createArgs);
    
    console.log('✅ Escrow created:', this.appId);
    return { appId: this.appId, txId };
  }

  /**
   * Buyer approves a milestone completion
   * Triggers automatic payment release via inner transaction
   */
  async approveMilestone(milestoneIndex: number): Promise<string> {
    console.log(`✅ Approving milestone ${milestoneIndex}...`);
    
    const txId = await this.callMethod('approve_milestone', [milestoneIndex]);
    
    console.log('💰 Payment released to seller');
    return txId;
  }

  /**
   * Seller requests approval for completed milestone
   */
  async requestMilestoneApproval(
    milestoneIndex: number,
    deliverableHash: string
  ): Promise<string> {
    console.log(`📤 Requesting approval for milestone ${milestoneIndex}...`);
    
    const hashBytes = new Uint8Array(Buffer.from(deliverableHash));
    const txId = await this.callMethod('request_milestone_approval', [
      milestoneIndex,
      hashBytes,
    ]);
    
    console.log('🔔 Notification sent to buyer');
    return txId;
  }

  /**
   * Raise a dispute (buyer or seller)
   */
  async raiseDispute(reason: string): Promise<string> {
    console.log('⚠️ Raising dispute...');
    
    const reasonBytes = new Uint8Array(Buffer.from(reason));
    const txId = await this.callMethod('raise_dispute', [reasonBytes]);
    
    console.log('🚨 Dispute raised, arbiter notified');
    return txId;
  }

  /**
   * Arbiter resolves dispute with custom fund distribution
   */
  async resolveDispute(
    releaseToSeller: number,
    refundToBuyer: number
  ): Promise<string> {
    console.log('⚖️ Resolving dispute...');
    
    const txId = await this.callMethod('resolve_dispute', [
      releaseToSeller,
      refundToBuyer,
    ]);
    
    console.log('✅ Dispute resolved');
    return txId;
  }

  /**
   * Cancel escrow and refund (only if no work started)
   */
  async cancelAndRefund(): Promise<string> {
    console.log('🔙 Cancelling escrow...');
    
    const txId = await this.callMethod('cancel_and_refund', []);
    
    console.log('💸 Funds refunded to buyer');
    return txId;
  }

  /**
   * Get current escrow status (read-only)
   * Reads directly from contract global state
   */
  async getStatus(): Promise<EscrowStatus> {
    console.log('📊 Fetching escrow status...');
    
    const state = await this.readGlobalState();
    
    return {
      status: (state.status || 'active') as EscrowStatus['status'],
      completed: state.completedMilestones || 0,
      total: state.totalMilestones || 0,
      released: state.releasedAmount || 0,
      remaining: (state.totalAmount || 0) - (state.releasedAmount || 0),
      lastUpdated: state.lastUpdated || 0,
    };
  }

  /**
   * Get contract participants (read-only)
   */
  async getParticipants(): Promise<EscrowParticipants> {
    console.log('👥 Fetching participants...');
    
    const state = await this.readGlobalState();
    
    return {
      buyer: String(state.buyer || ''),
      seller: String(state.seller || ''),
      arbiter: String(state.arbiter || ''),
    };
  }

  /**
   * Get contract application address
   */
  getApplicationAddress(): string {
    const address = algosdk.getApplicationAddress(this.appId);
    return typeof address === 'string' ? address : address.toString();
  }

  /**
   * Get application ID
   */
  getAppId(): number {
    return this.appId;
  }
}
