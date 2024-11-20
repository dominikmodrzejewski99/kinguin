import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { Offer, Api } from '../interfaces/api';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Sprawdza, czy wszystkie żądania zostały zrealizowane
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOffers', () => {
    it('should return an array of offers', () => {
      const mockResponse: { _embedded: { kinguinOffer: Offer[] } } = {
        _embedded: {
          kinguinOffer: [
            {id: '1', name: 'Offer 1', price: 10},
            {id: '2', name: 'Offer 2', price: 20},
          ] as unknown as Offer[],
        },
      };

      const testId = '6655a390bccd0c659cb6ffdd';
      service.getOffers(testId).subscribe((offers) => {
        expect(offers.length).toBe(2);
        expect(offers).toEqual(mockResponse._embedded.kinguinOffer);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/${testId}`);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('x-test')).toBe(environment.test);

      req.flush(mockResponse); // Symuluje odpowiedź serwera
    });

    it('should handle empty response gracefully', () => {
      const mockResponse: { _embedded: { kinguinOffer: any[] } } = {
        _embedded: {
          kinguinOffer: [],
        },
      };

      const testId = '6655a390bccd0c659cb6ffdd';
      service.getOffers(testId).subscribe((offers) => {
        expect(offers.length).toBe(0);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/${testId}`);
      req.flush(mockResponse);
    });
  });
});
