// Browser polyfills for Node.js globals required by Algorand SDK
import { Buffer } from 'buffer';

// Make Buffer available globally for crypto libraries
if (typeof globalThis !== 'undefined' && typeof window !== 'undefined') {
  if (!globalThis.Buffer) {
    globalThis.Buffer = Buffer;
  }
  
  if (!globalThis.global) {
    globalThis.global = globalThis;
  }
  
  if (!globalThis.process) {
    globalThis.process = {
      env: {},
      version: '',
      platform: 'browser',
      nextTick: (fn: Function) => setTimeout(fn, 0),
    } as any;
  }
}

export {};
