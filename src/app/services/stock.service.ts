import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { StockQuote } from '../models/stockQuote';
import { Sector } from '../models/sector';
import { isDevMode} from '@angular/core';
import { environment } from '../../environments/environment';

interface ApiStatus {
  status: string;
  version: string;
  time: Date;
  currentMonthAPICalls: number;
}

export interface StockData {
    symbol: string;
    sector: string;
    securityType: string;
    bidPrice: number;
    bidSize: number;
    askPrice: number;
    askSize: number,
    lastUpdated: Date,
    lastSalePrice: number,
    lastSaleSize: number,
    lastSaleTime: Date,
    volume: number
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private base_url = environment.IEX_BASE_URL;
  private sandbox_url = environment.SANDBOX_API;
  private test_token = environment.IEX_TEST_TOKEN;
  private dev_token = environment.IEX_DEV_TOKEN
  private portfolioURI = environment.PORTFOLIO_URI;
  public localStore = window.localStorage;
  constructor(private http: HttpClient) {}

// https://sandbox.iexapis.com/stable/tops?token=Tpk_e370cc9230a611e9958142010a80043c&symbols=AAPL
  getPrice(symbol: string): Observable<StockData> {
    console.log(`
    fetching stock price for ${symbol} \n
    sandbox_url: ${this.sandbox_url} \n
    api_token: ${this.test_token}
    `)
    return this.http
    .get<StockData>(
      `${this.sandbox_url}/tops?token=${this.test_token}&symbols=${symbol}`
    )
    .pipe(
      retry(2), // retry a failed request up to 2 times
      catchError(this.handleError) // then handle the error
    );
  }


  /**
   * getWatchList - Returns the users watchlist from local storage
   */
  getWatchlist() {
    return this.localStore.getItem('watchlist');
  }

  getQuote(stockTicker: any): Observable<StockQuote> {
    return this.http
      .get<StockQuote>(
        `${this.sandbox_url}/stock/${stockTicker}/quote?token=${this.test_token}`
      )
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError) // then handle the error
      );
  }

  // https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=price&token=Tpk_e370cc9230a611e9958142010a80043c
  batchQuote(...symbols: any[]) {
    const queryString = symbols.toString();
    return this.http
      .get(
        `${this.sandbox_url}/stock/market/batch?symbols=${queryString}&types=price&token=${this.test_token}`
      )
      .pipe(catchError(this.handleError));
  }
  /**
   * Persists the user's portfolio to the database
   * @param stocks the stocks that make up the user's portfolio
   */
  addPortfolio(user: string, stocks: any) {
    console.log(user);
    if (!user) {
    }

    const obj = {
      user: user.trim(),
      stocks
    };
    return this.http
      .post(`${this.portfolioURI}`, obj)
      .pipe(retry(2), catchError(this.handleError));
  }

  removePortfolio(portfolioId: any) {
    this.http.get(`${this.portfolioURI}/${portfolioId}`).subscribe((res) => {
      console.log(res);
    });
  }


  // Latest price
  // https://cloud.iexapis.com/stable/stock/aapl/quote/latestPrice
  // getPrice(stockSymbol: any) {
  //   return this.http
  //     .get(`${this.sandbox_url}/stock/${stockSymbol}/price?token=${this.token}`), catchError(this.handleError);
  // }
  /**
   * @param listName - The type of list. Options include "gainers", "losers", and "mostactive"
   */
  returnList(listName: string) {
    return this.http
      .get(`${this.sandbox_url}/market/list/${listName}?token=${this.test_token}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * Returns the status of the IEX Cloud API
   * returns {"status":"up","version":"1.32","time":1593027703114,"currentMonthAPICalls":14035275811}
   */
  getStatus(): Observable<ApiStatus> {
    return this.http
      .get<ApiStatus>(`https://cloud.iexapis.com/stable/status`)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * Returns the performance of each sector
   */
  getSectorPerformance(): Observable<Sector[]> {
    if (isDevMode()){
      console.log('use dev_url in dev mode')
    } else {
      console.log('use prod_url in prod mode')
    }
    return this.http
      .get<Sector[]>(
        `${this.sandbox_url}/stock/market/sector-performance?token=${this.test_token}`
      )
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError) // then handle the error
      );
  }

  /**
   * Helper function that fetches a logo given a stock symbol
   * @param stock The symbol of the company
   */
  getLogo(stock: any) {
    return this.http
      .get(`https://storage.googleapis.com/iex/api/logos/${stock}.png`)
      .pipe(retry(2), catchError(this.handleError));
  }


  /**
   * handleError - Logs the error to the console
   * @param error represents the error that has occured
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}










// TEST TOKEN

/////////////////////////

// API STATUS
// https://cloud.iexapis.com/stable/status

// Sector Performance
// https://sandbox.iexapis.com/stable/stock/market/sector-performance?token=Tpk_e370cc9230a611e9958142010a80043c

// Stock Price
// https://sandbox.iexapis.com/stable/stock/aapl/price?token=Tpk_e370cc9230a611e9958142010a80043c

// Stock Quote
// https://sandbox.iexapis.com/stable/stock/aapl/quote?token=Tpk_e370cc9230a611e9958142010a80043c

// Gainers
// https://sandbox.iexapis.com/stable/stock/market/list/gainers?token=Tpk_e370cc9230a611e9958142010a80043c

// BATCH QUOTE - STOCK
// https://sandbox.iexapis.com/stable/stock/aapl/batch?types=quote,news,chart&range=1m&last=10&token=Tsk_ca3e777430a611e9958142010a80043c

// BATCH QUOTE - MARKET
// https://sandbox.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5&token=Tsk_ca3e777430a611e9958142010a80043c

// NEWS
// https://sandbox.iexapis.com/stable/stock/aapl/news?token=Tsk_ca3e777430a611e9958142010a80043c

// PRICE TARGET
// https://sandbox.iexapis.com/stable/stock/twtr/price-target?token=Tsk_ca3e777430a611e9958142010a80043c

// KEY  STATS
// https://sandbox.iexapis.com/stable/stock/aapl/stats?token=Tsk_ca3e777430a611e9958142010a80043c

// ADVANCED STATS = KEY STATS + MORE
// https://sandbox.iexapis.com/stable/stock/aapl/advanced-stats?token=Tsk_ca3e777430a611e9958142010a80043c



// let obj = {"chart": [{"a": 1}, {"b": 2}, {"c": 3}]}
