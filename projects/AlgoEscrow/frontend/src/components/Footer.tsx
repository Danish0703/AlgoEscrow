import { Shield, Github, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">AlgoZKP</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Open-source Zero-Knowledge Proof Toolkit for Algorand
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://algorand.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Algorand Foundation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  AlgoBharat Hackathon
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Built for the <span className="text-primary font-semibold">AlgoBharat Hack Series #2</span> • Released under the MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}
