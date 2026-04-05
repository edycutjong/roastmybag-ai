// ─── Core Data Types ───────────────────────────────────────

export interface TokenTransfer {
  hash: string;
  from: string;
  to: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  contractAddress: string;
  value: string;
  timeStamp: string;
  blockNumber: string;
}

export interface AnalyzedTrade {
  tokenName: string;
  tokenSymbol: string;
  contractAddress: string;
  amountSold: number;
  sellPrice: number;
  currentPrice: number;
  missedGains: number;
  sellDate: string;
  txHash: string;
}

export interface WalletStats {
  totalMissedUsd: number;
  worstSell: AnalyzedTrade | null;
  jeetScore: number;
  tokensJeeted: number;
  trades: AnalyzedTrade[];
}

export interface RoastBeat {
  type: 'opening' | 'data' | 'comparison' | 'closing';
  text: string;
  highlight: string | null;
}

export interface RoastResult {
  script: string;
  beats: RoastBeat[];
  title: string;
  jeetScore: number;
}

export interface CertificateData {
  jeetScore: number;
  title: string;
  emoji: string;
  worstSell: {
    tokenSymbol: string;
    soldAt: number;
    nowWorth: number;
    missedUsd: number;
  } | null;
  totalMissedUsd: number;
  walletShort: string;
}
