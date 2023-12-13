/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlatziStoreService } from './platzi-store.service';

describe('Service: PlatziStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatziStoreService]
    });
  });

  it('should ...', inject([PlatziStoreService], (service: PlatziStoreService) => {
    expect(service).toBeTruthy();
  }));
});
