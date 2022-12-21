/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FaqService } from './faq.service';

describe('Service: Faq', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaqService]
    });
  });

  it('should ...', inject([FaqService], (service: FaqService) => {
    expect(service).toBeTruthy();
  }));
});
