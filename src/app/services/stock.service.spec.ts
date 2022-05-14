import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { StockService } from './stock.service';
import { TestBed } from '@angular/core/testing';

describe('StockService', () => {
  let service: StockService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [StockService, HttpTestingController]
    });
    service = TestBed.get(StockService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: StockService = TestBed.get(StockService);
    expect(service).toBeTruthy();
  });
});
