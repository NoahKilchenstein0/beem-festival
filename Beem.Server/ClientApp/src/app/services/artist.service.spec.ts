/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArtistService } from './artist.service';

describe('Service: Artist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistService]
    });
  });

  it('should ...', inject([ArtistService], (service: ArtistService) => {
    expect(service).toBeTruthy();
  }));
});
