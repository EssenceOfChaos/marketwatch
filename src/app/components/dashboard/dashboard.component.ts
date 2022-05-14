import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StockService } from 'src/app/services/stock.service';
import { StockQuote } from 'src/app/models/stockQuote';
import { Sector } from 'src/app/models/sector';
import { STOCKS } from 'src/app/components/constants';
import { StockData } from 'src/app/services/stock.service'

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  stockData: any;
  stockQuote: any;
  sectors: any;
  stocks = STOCKS;
  stockList: any;
  watchList = [];
  showSectors = false;
  localStore = window.localStorage;


  constructor(private stockService: StockService) {}

  ngOnInit() {
    console.log('DashboardComponent: ngOnInit has fired!');
    this.stockService.getSectorPerformance().subscribe((res) => this.sectors = res)
  }

/** get stock price */
 getStockPrice(symbol: string) {
  this.stockService.getPrice(symbol)
  .subscribe((data: StockData) => {
    console.log(data)
    this.stockData = data
  })
 }

  // getStockQuote(stockTicker: string) {
  //   console.log(stockTicker);
  //   this.stockService
  //     .getQuote(stockTicker)
  //     .subscribe((quote) => (this.stockQuote = quote));
  // }

  // getSectorPerformance() {
  //   this.stockService
  //     .getSectorPerformance()
  //     .subscribe((res) => (this.sectors = res));
  //   console.log(this.sectors);
  // }

  addToWatchlist(sym: string) {
    // console.log(sym);
    // this.watchList.push(sym);
    // this.localStore.setItem('watchlist', JSON.stringify(this.watchList));
    // this.alertService.notifyUser(
    //   `${sym} has been successfully added to your Watchlist!`
    // );
  }

  removeFromWatchlist(sym: string) {
    // remove stock from Watch List
  }
}
