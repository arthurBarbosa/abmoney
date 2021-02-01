import { TestBed } from '@angular/core/testing';

import { BookEntryService } from './book-entry.service';

describe('BookEntryService', () => {
  let service: BookEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
