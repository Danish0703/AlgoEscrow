import { useState } from 'react';
import { Book, ChevronRight, Code, Rocket, FileText, Shield, GitBranch } from 'lucide-react';

export default function Docs() {
  const [activeSection, setActiveSection] = useState('introduction');

  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { id: 'introduction', label: 'Introduction', icon: Book },
        { id: 'installation', label: 'Installation', icon: Rocket },
        { id: 'quick-start', label: 'Quick Start', icon: FileText },
      ],
    },
    {
      title: 'SDK Reference',
      items: [
        { id: 'creating-escrow', label: 'Creating Escrow', icon: Code },
        { id: 'milestone-management', label: 'Milestone Management', icon: GitBranch },
        { id: 'dispute-resolution', label: 'Dispute Resolution', icon: Shield },
      ],
    },
    {
      title: 'Smart Contracts',
      items: [
        { id: 'contract-architecture', label: 'Contract Architecture', icon: Code },
        { id: 'deployment', label: 'Deployment Guide', icon: Rocket },
      ],
    },
  ];

  const content: Record<string, { title: string; body: JSX.Element }> = {
    introduction: {
      title: 'Introduction to AlgoEscrow Pro',
      body: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Welcome to AlgoEscrow Pro, a production-ready escrow toolkit for the Algorand blockchain.
          </p>
          
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-foreground">
              <strong>Built for AlgoBharat Road to Impact 2025</strong><br />
              This toolkit provides reusable building blocks for milestone-based payments, 
              real-time tracking, and dispute resolution on Algorand.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">What is AlgoEscrow Pro?</h2>
          <p className="text-muted-foreground">
            AlgoEscrow Pro enables developers to build trust-minimized payment systems on Algorand.
            It handles the complexity of escrow management, milestone tracking, and dispute resolution
            so you can focus on building great products.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Real-time escrow status tracking with live updates</li>
            <li>Milestone-based payment releases with deliverable verification</li>
            <li>Built-in dispute resolution with trusted arbiters</li>
            <li>PyTeal smart contracts optimized for Algorand</li>
            <li>TypeScript SDK with React hooks for easy integration</li>
            <li>Comprehensive test suite and deployment scripts</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">🎯 Freelance Platforms</h3>
              <p className="text-sm text-muted-foreground">
                Protect clients and freelancers with milestone-based payments and deliverable tracking
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">🛍️ Marketplace Escrow</h3>
              <p className="text-sm text-muted-foreground">
                Enable safe P2P transactions for goods and services with automatic releases
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">🏠 Rental Deposits</h3>
              <p className="text-sm text-muted-foreground">
                Collect refundable security deposits with time-locked or condition-based releases
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-2">💼 Service Agreements</h3>
              <p className="text-sm text-muted-foreground">
                Manage multi-phase projects with incremental payments and milestone approvals
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Why Algorand?</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Low Costs</strong>: ~0.002 ALGO per transaction (~$0.0002)</li>
            <li><strong className="text-foreground">Fast Finality</strong>: ~4 second settlement times</li>
            <li><strong className="text-foreground">Reliable</strong>: Never forked, environmentally friendly</li>
            <li><strong className="text-foreground">Scalable</strong>: 6,000+ TPS with immediate finality</li>
          </ul>
        </div>
      ),
    },
    installation: {
      title: 'Installation',
      body: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Get started with AlgoEscrow Pro by installing the SDK and setting up your development environment.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Node.js 18+ and npm/yarn/bun</li>
            <li>AlgoKit CLI (for smart contract deployment)</li>
            <li>An Algorand wallet (Pera Wallet recommended for testing)</li>
            <li>TestNet ALGOs (get free from <a href="https://dispenser.testnet.aws.algodev.network/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">TestNet dispenser</a>)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Install AlgoKit</h2>
          <div className="p-4 rounded-lg bg-card border border-border mb-4">
            <code className="text-primary font-mono text-sm">pip install algokit</code>
          </div>
          <p className="text-sm text-muted-foreground">
            Or use Homebrew on macOS: <code className="text-primary">brew install algorand/tap/algokit</code>
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Install SDK (Coming Soon)</h2>
          <div className="p-4 rounded-lg bg-card border border-border mb-4">
            <code className="text-primary font-mono text-sm">npm install @algoescrow/sdk</code>
          </div>
          <p className="text-sm text-muted-foreground">
            The npm package is currently under development. For now, clone the repository and follow the integration guide.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Clone the Repository</h2>
          <div className="p-4 rounded-lg bg-card border border-border space-y-2 font-mono text-sm">
            <div><code className="text-primary">git clone https://github.com/yourusername/algoescrow-pro.git</code></div>
            <div><code className="text-primary">cd algoescrow-pro</code></div>
            <div><code className="text-primary">npm install</code></div>
            <div><code className="text-primary">npm run dev</code></div>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Verify Installation</h2>
          <p className="text-muted-foreground mb-2">
            Check that AlgoKit is properly installed:
          </p>
          <div className="p-4 rounded-lg bg-card border border-border">
            <code className="text-primary font-mono text-sm">algokit --version</code>
          </div>
        </div>
      ),
    },
    'quick-start': {
      title: 'Quick Start Guide',
      body: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Get your first escrow running in under 5 minutes with this quick start guide.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Step 1: Set Up Environment</h2>
          <p className="text-muted-foreground mb-4">
            Create a <code className="text-primary">.env</code> file in your project root:
          </p>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm space-y-1">
            <div><span className="text-primary">VITE_ALGOD_TOKEN</span>=</div>
            <div><span className="text-primary">VITE_ALGOD_SERVER</span>=https://testnet-api.algonode.cloud</div>
            <div><span className="text-primary">VITE_ALGOD_PORT</span>=443</div>
            <div><span className="text-primary">VITE_NETWORK</span>=testnet</div>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Step 2: Connect Your Wallet</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`import { WalletProvider } from '@/contexts/WalletProvider';

function App() {
  return (
    <WalletProvider>
      {/* Your app components */}
    </WalletProvider>
  );
}`}</pre>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Step 3: Use the Escrow Hook</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`import { useAlgoEscrowClient } from '@/hooks/useAlgoEscrowClient';

function MyComponent() {
  const escrowClient = useAlgoEscrowClient(appId);
  
  const createEscrow = async () => {
    const result = await escrowClient.createEscrow({
      buyer: buyerAddress,
      seller: sellerAddress,
      arbiter: arbiterAddress,
      amount: 1000000, // 1 ALGO in microAlgos
      milestones: [
        { description: "Phase 1", amount: 500000 },
        { description: "Phase 2", amount: 500000 }
      ]
    });
    
    console.log("Escrow created:", result.appId);
  };
  
  return <button onClick={createEscrow}>Create Escrow</button>;
}`}</pre>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Step 4: Track Status in Real-time</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`import { useRealtimeEscrow } from '@/hooks/useRealtimeEscrow';

function EscrowStatus({ client }) {
  const { status, isLoading } = useRealtimeEscrow(client);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <p>Status: {status?.status}</p>
      <p>Funds: {status?.totalFunds} microAlgos</p>
      <p>Milestones: {status?.currentMilestone}/{status?.totalMilestones}</p>
    </div>
  );
}`}</pre>
          </div>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mt-8">
            <p className="text-sm text-foreground">
              <strong>Next Steps:</strong> Check out the full SDK reference for milestone management, 
              dispute resolution, and advanced features like time locks and partial refunds.
            </p>
          </div>
        </div>
      ),
    },
    'creating-escrow': {
      title: 'Creating an Escrow',
      body: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Learn how to create and configure escrow contracts using the AlgoEscrow SDK.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Basic Escrow Creation</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`const escrowClient = useAlgoEscrowClient();

const params = {
  buyer: "BUYER_ADDRESS",
  seller: "SELLER_ADDRESS", 
  arbiter: "ARBITER_ADDRESS",
  amount: 5000000, // 5 ALGO
  milestones: [
    { 
      description: "Initial design mockups",
      amount: 2000000,
      deadline: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    },
    {
      description: "Development complete",
      amount: 3000000,
      deadline: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  ]
};

const { appId, txId } = await escrowClient.createEscrow(params);
console.log(\`Escrow created with App ID: \${appId}\`);`}</pre>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Parameters Explained</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">buyer</strong>: Address that deposits funds</li>
            <li><strong className="text-foreground">seller</strong>: Address that receives funds upon milestone approval</li>
            <li><strong className="text-foreground">arbiter</strong>: Trusted third party for dispute resolution</li>
            <li><strong className="text-foreground">amount</strong>: Total escrow amount in microAlgos (1 ALGO = 1,000,000 microAlgos)</li>
            <li><strong className="text-foreground">milestones</strong>: Array of payment milestones with descriptions and amounts</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Advanced Options</h2>
          <div className="p-4 rounded-lg bg-card border border-border">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong className="text-foreground">Time locks</strong>: Auto-release after deadline if no disputes</li>
              <li>• <strong className="text-foreground">Partial refunds</strong>: Support for project cancellation mid-way</li>
              <li>• <strong className="text-foreground">Multi-token</strong>: Support for USDC and other Algorand Standard Assets</li>
              <li>• <strong className="text-foreground">Deliverable hashes</strong>: Link milestones to IPFS hashes for verification</li>
            </ul>
          </div>
        </div>
      ),
    },
    'milestone-management': {
      title: 'Milestone Management',
      body: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Manage milestone submissions, approvals, and fund releases with the AlgoEscrow SDK.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Submit Milestone for Approval</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`// Seller submits completed work
await escrowClient.requestMilestoneApproval(
  0, // milestone index
  "QmX7x9kJfz..." // IPFS hash of deliverable
);`}</pre>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Approve Milestone</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`// Buyer approves and releases funds
const txId = await escrowClient.approveMilestone(0);
console.log("Funds released:", txId);`}</pre>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Track Milestone Status</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`const status = await escrowClient.getStatus();

status.milestones.forEach((milestone, index) => {
  console.log(\`Milestone \${index}: \${milestone.status}\`);
  // status can be: "pending", "submitted", "approved", "released"
});`}</pre>
          </div>
        </div>
      ),
    },
    'dispute-resolution': {
      title: 'Dispute Resolution',
      body: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Handle disputes fairly and transparently with built-in arbitration.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Raise a Dispute</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`// Either buyer or seller can raise dispute
await escrowClient.raiseDispute(
  "Deliverable does not match agreed specifications"
);`}</pre>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Resolve Dispute (Arbiter)</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`// Arbiter reviews evidence and splits funds
await escrowClient.resolveDispute(
  3000000, // amount to seller (3 ALGO)
  2000000  // amount to buyer (2 ALGO)
);`}</pre>
          </div>

          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mt-6">
            <p className="text-sm text-foreground">
              <strong>Best Practice:</strong> Choose arbiters who are trusted by both parties 
              and have expertise in the domain (design, development, etc.)
            </p>
          </div>
        </div>
      ),
    },
    'contract-architecture': {
      title: 'Smart Contract Architecture',
      body: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Understand the PyTeal smart contract powering AlgoEscrow Pro.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Contract State</h2>
          <div className="p-4 rounded-lg bg-card border border-border">
            <ul className="space-y-2 text-sm font-mono text-muted-foreground">
              <li>• <span className="text-primary">buyer</span>: Address (bytes)</li>
              <li>• <span className="text-primary">seller</span>: Address (bytes)</li>
              <li>• <span className="text-primary">arbiter</span>: Address (bytes)</li>
              <li>• <span className="text-primary">total_amount</span>: uint64</li>
              <li>• <span className="text-primary">current_milestone</span>: uint64</li>
              <li>• <span className="text-primary">status</span>: bytes ("active", "disputed", "completed")</li>
              <li>• <span className="text-primary">milestones</span>: Array of milestone structs</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Key Methods</h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-card border border-border">
              <code className="text-primary">create_escrow()</code>
              <p className="text-sm text-muted-foreground mt-1">Initializes contract with parties and milestones</p>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <code className="text-primary">request_milestone_approval()</code>
              <p className="text-sm text-muted-foreground mt-1">Seller submits work for review</p>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <code className="text-primary">approve_milestone()</code>
              <p className="text-sm text-muted-foreground mt-1">Buyer approves and releases funds</p>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <code className="text-primary">raise_dispute()</code>
              <p className="text-sm text-muted-foreground mt-1">Initiates arbitration process</p>
            </div>
            <div className="p-3 rounded-lg bg-card border border-border">
              <code className="text-primary">resolve_dispute()</code>
              <p className="text-sm text-muted-foreground mt-1">Arbiter splits funds</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Security Features</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Role-based access control (only authorized parties can call methods)</li>
            <li>State validation before each transaction</li>
            <li>Atomic transactions for fund releases</li>
            <li>Reentrancy protection</li>
          </ul>
        </div>
      ),
    },
    deployment: {
      title: 'Deployment Guide',
      body: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Deploy AlgoEscrow smart contracts to TestNet or MainNet using AlgoKit.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Deploy to TestNet</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm space-y-2">
            <div><code className="text-primary">algokit project deploy testnet</code></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            This will compile your PyTeal contracts and deploy to TestNet. Save the App ID for your frontend.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Deploy to MainNet</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm space-y-2">
            <div><code className="text-primary">algokit project deploy mainnet</code></div>
          </div>

          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 mt-4">
            <p className="text-sm text-foreground">
              <strong>⚠️ Important:</strong> Test thoroughly on TestNet before deploying to MainNet. 
              MainNet transactions use real ALGO and cannot be reversed.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mt-8">Update Your Frontend</h2>
          <div className="p-4 rounded-lg bg-card border border-border font-mono text-sm">
            <pre className="text-primary">{`// Update your environment variables
VITE_ESCROW_APP_ID=123456789
VITE_NETWORK=mainnet`}</pre>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <aside className="space-y-6">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">Documentation</h2>
              
              {navigation.map((section) => (
                <div key={section.title} className="mb-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                              activeSection === item.id
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                            {activeSection === item.id && (
                              <ChevronRight className="h-4 w-4 ml-auto" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="max-w-4xl">
            <article className="prose prose-invert max-w-none">
              <h1 className="text-4xl font-bold text-foreground mb-6">
                {content[activeSection].title}
              </h1>
              {content[activeSection].body}
            </article>

            {/* Navigation Footer */}
            <div className="mt-12 pt-8 border-t border-border flex justify-between">
              <div className="text-sm text-muted-foreground">
                Need help? Join our community on GitHub
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
