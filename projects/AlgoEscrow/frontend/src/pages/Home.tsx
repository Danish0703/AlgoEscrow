import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Clock, Users, Zap, Lock, GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
              <Shield className="h-4 w-4" />
              Built for AlgoBharat Road to Impact 2025
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Milestone-Based Payments
              <span className="block text-primary mt-2">Made Simple on Algorand</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Production-ready escrow toolkit with real-time tracking, secure milestone management,
              and built-in dispute resolution. Perfect for freelance platforms, marketplaces, and P2P transactions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                <Link to="/escrow">
                  Try Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/docs">View Documentation</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary">~0.002Ⱥ</div>
                <div className="text-sm text-muted-foreground">Per Transaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">~4s</div>
                <div className="text-sm text-muted-foreground">Settlement Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Open Source</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="features" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Trust Problem in Digital Payments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              When strangers transact online, who holds the money? Traditional escrow is slow and expensive.
              AlgoEscrow Pro brings instant, trustless escrow to any platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-border bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Freelance Platforms</h3>
              <p className="text-muted-foreground">
                Protect both clients and freelancers with milestone-based releases and built-in dispute resolution.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Marketplace Escrow</h3>
              <p className="text-muted-foreground">
                Enable safe peer-to-peer trading for goods and services with automatic fund release upon delivery.
              </p>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Service Deposits</h3>
              <p className="text-muted-foreground">
                Collect refundable deposits for bookings, rentals, and subscriptions with time-locked releases.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Developers, Designed for Scale
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit that makes implementing escrow as easy as adding a React component.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-border bg-card">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Real-time Status Tracking</h3>
              <p className="text-muted-foreground mb-4">
                Live updates on escrow status with WebSocket-style reactivity. Both parties always know
                exactly what's happening with their funds.
              </p>
              <ul className="space-y-2">
                {['Pending deposits', 'Milestone submissions', 'Approval requests', 'Fund releases'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 border-border bg-card">
              <GitBranch className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Milestone Management</h3>
              <p className="text-muted-foreground mb-4">
                Break large projects into smaller, verifiable milestones. Release funds incrementally
                as work is completed and approved.
              </p>
              <ul className="space-y-2">
                {['Multiple milestones per escrow', 'Deliverable hash verification', 'Partial releases', 'Progress tracking'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 border-border bg-card">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Dispute Resolution</h3>
              <p className="text-muted-foreground mb-4">
                Fair arbitration system with trusted third parties. Disputes can be raised, reviewed,
                and resolved transparently on-chain.
              </p>
              <ul className="space-y-2">
                {['Raise disputes with evidence', 'Arbiter review process', 'Split fund resolution', 'Full refund support'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8 border-border bg-card">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Smart Contract Security</h3>
              <p className="text-muted-foreground mb-4">
                Battle-tested PyTeal contracts with comprehensive state management. Your funds are
                always protected by Algorand's security guarantees.
              </p>
              <ul className="space-y-2">
                {['Role-based access control', 'Time-locked releases', 'Atomic transactions', 'State verification'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Three Steps to Secure Payments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From integration to production in minutes, not days.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xl font-bold text-primary">
                1
              </div>
              <Card className="p-8 border-border bg-card pt-12">
                <h3 className="text-xl font-semibold mb-3">Install & Configure</h3>
                <div className="bg-background/50 p-3 rounded font-mono text-sm mb-3">
                  <code className="text-primary">npm install algoescrow</code>
                </div>
                <p className="text-muted-foreground">
                  Add the SDK to your project. Configure your Algorand connection and deploy the smart contract to TestNet.
                </p>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xl font-bold text-primary">
                2
              </div>
              <Card className="p-8 border-border bg-card pt-12">
                <h3 className="text-xl font-semibold mb-3">Create Escrow</h3>
                <div className="bg-background/50 p-3 rounded font-mono text-sm mb-3">
                  <code className="text-primary">client.createEscrow()</code>
                </div>
                <p className="text-muted-foreground">
                  Define milestones, parties, and arbiters. The smart contract handles all the complexity of fund management.
                </p>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xl font-bold text-primary">
                3
              </div>
              <Card className="p-8 border-border bg-card pt-12">
                <h3 className="text-xl font-semibold mb-3">Track & Release</h3>
                <div className="bg-background/50 p-3 rounded font-mono text-sm mb-3">
                  <code className="text-primary">client.approveMilestone()</code>
                </div>
                <p className="text-muted-foreground">
                  Real-time status updates as work progresses. Approve milestones to trigger automatic fund releases.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built on Battle-Tested Technology
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Algorand', desc: 'Layer 1 Blockchain' },
              { name: 'PyTeal', desc: 'Smart Contracts' },
              { name: 'AlgoKit', desc: 'Development Tools' },
              { name: 'TypeScript', desc: 'Type-Safe SDK' },
            ].map((tech) => (
              <Card key={tech.name} className="p-6 text-center border-border bg-card hover:border-primary/50 transition-colors">
                <h4 className="font-semibold text-lg mb-1">{tech.name}</h4>
                <p className="text-sm text-muted-foreground">{tech.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Build Trustless Payments?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the AlgoBharat community and start building production-ready escrow systems on Algorand today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
              <Link to="/escrow">
                Try Live Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Hackathon Note */}
          <div className="mt-12 p-6 rounded-lg border border-primary/20 bg-primary/5">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Built for AlgoBharat Road to Impact 2025</strong>
              <br />
              This is a production-ready, reusable toolkit designed to help developers integrate secure 
              escrow functionality into their Algorand dApps. Open source and ready for community contributions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
