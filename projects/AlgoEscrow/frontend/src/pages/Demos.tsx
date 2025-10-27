import { Link } from 'react-router-dom';
import { WalletConnect } from '@/components/WalletConnect';
import { useWallet } from '@/contexts/WalletProvider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Clock, Users, ArrowRight } from 'lucide-react';

export default function Demos() {
  const { activeAddress } = useWallet();

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-end">
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Experience AlgoEscrow Pro
              <span className="block text-primary mt-2">in Action</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Try our interactive demos to see how milestone-based escrow works on Algorand.
            </p>
          </div>

          {/* Main Demo Card */}
          <Card className="p-8 border-border bg-card">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Real-time Escrow System
                </h2>
                <p className="text-muted-foreground">
                  Create milestone-based payments with live tracking, approvals, and dispute resolution.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-border mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                <strong className="text-foreground">Demo Scenario:</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Experience a full escrow workflow: create an escrow, submit milestones, approve payments, 
                and handle disputes. Perfect for freelance work, service agreements, and marketplace transactions.
              </p>
            </div>

            {!activeAddress ? (
              <div className="text-center py-8 space-y-4">
                <p className="text-muted-foreground">Connect your wallet to try the live demo</p>
                <WalletConnect />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Secure Funds</h3>
                    <p className="text-sm text-muted-foreground">
                      Smart contract holds funds until milestones are approved
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <Clock className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Live Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time status updates for all parties involved
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">Dispute Resolution</h3>
                    <p className="text-sm text-muted-foreground">
                      Fair arbitration with trusted third parties
                    </p>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link to="/escrow">
                    Launch Escrow Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            )}
          </Card>

          {/* Use Cases */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 border-border bg-card">
              <h3 className="font-semibold text-lg mb-2">👨‍💻 Freelance Projects</h3>
              <p className="text-sm text-muted-foreground">
                Break projects into milestones. Release payments as work is completed and approved.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <h3 className="font-semibold text-lg mb-2">🛒 Marketplace Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Enable safe P2P trading. Funds held until delivery is confirmed by buyer.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <h3 className="font-semibold text-lg mb-2">🏠 Service Deposits</h3>
              <p className="text-sm text-muted-foreground">
                Collect refundable deposits with automatic release after service completion.
              </p>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-12 p-6 rounded-lg bg-secondary/50 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">How This Demo Works</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Smart contracts on Algorand hold funds securely until conditions are met</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Real-time status tracking keeps all parties informed throughout the process</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>This demo uses simulated contracts for demonstration - production version deploys real PyTeal contracts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Built for AlgoBharat Road to Impact 2025 as a reusable toolkit for developers</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
