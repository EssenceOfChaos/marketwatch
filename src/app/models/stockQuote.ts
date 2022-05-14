export interface StockQuote {
  symbol: string;
  companyName: string;
  primaryExchange: string;
  calculationPrice: string;
  open: number;
  openTime: number;
  close: number;
  closeTime: number;
  high: number;
  low: number;
  latestPrice: number;
  latestSource: string;
  latestTime: string;
  latestUpdate: number;
  latestVolume: number;
  previousClose: number;
  previousVolume: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  lastTradeTime: number;
}
