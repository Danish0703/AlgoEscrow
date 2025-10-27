import { EscrowManager } from '../components/EscrowManager';

export default function Escrow() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Real-time Escrow System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Milestone-based payments with live tracking on Algorand blockchain.
            Perfect for freelance work, service agreements, and secure P2P transactions.
          </p>
        </div>

        <EscrowManager />

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-2">🔒 Secure Escrow</h3>
            <p className="text-sm text-muted-foreground">
              Funds held safely in smart contract until milestones are approved
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-2">⚡ Real-time Updates</h3>
            <p className="text-sm text-muted-foreground">
              Live status tracking with instant notifications for all parties
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="font-semibold text-lg mb-2">⚖️ Dispute Resolution</h3>
            <p className="text-sm text-muted-foreground">
              Trusted arbiter can resolve conflicts fairly and transparently
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
