// Validation utilities for Algorand addresses and inputs

/**
 * Validates an Algorand address
 * @param address - Address to validate
 * @returns true if valid, false otherwise
 */
export function isValidAlgorandAddress(address: string): boolean {
  // Algorand addresses are 58 characters, base32 encoded
  if (!address || address.length !== 58) {
    return false;
  }
  
  // Check if it's valid base32
  const base32Regex = /^[A-Z2-7]+$/;
  return base32Regex.test(address);
}

/**
 * Validates escrow creation parameters
 */
export function validateEscrowParams(params: {
  seller: string;
  arbiter: string;
  buyer: string;
  milestones: number;
  amount: number;
}): { valid: boolean; error?: string } {
  if (!isValidAlgorandAddress(params.seller)) {
    return { valid: false, error: 'Invalid seller address format' };
  }
  
  if (!isValidAlgorandAddress(params.arbiter)) {
    return { valid: false, error: 'Invalid arbiter address format' };
  }
  
  if (!isValidAlgorandAddress(params.buyer)) {
    return { valid: false, error: 'Invalid buyer address format' };
  }
  
  if (params.milestones < 1 || params.milestones > 100) {
    return { valid: false, error: 'Milestones must be between 1 and 100' };
  }
  
  if (params.amount < 100000) {
    return { valid: false, error: 'Amount must be at least 0.1 ALGO (100,000 microAlgos)' };
  }
  
  // Ensure all parties are different
  if (params.seller === params.buyer) {
    return { valid: false, error: 'Seller and buyer cannot be the same' };
  }
  
  if (params.seller === params.arbiter) {
    return { valid: false, error: 'Seller and arbiter cannot be the same' };
  }
  
  if (params.buyer === params.arbiter) {
    return { valid: false, error: 'Buyer and arbiter cannot be the same' };
  }
  
  return { valid: true };
}
