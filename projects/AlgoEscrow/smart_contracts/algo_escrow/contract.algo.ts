import { Contract } from '@algorandfoundation/algorand-typescript'

export class AlgoEscrow extends Contract {
  public hello(name: string): string {
    return `Hello, ${name}`
  }
}
