import { TestBed } from '@angular/core/testing';

import { AppSsrStateService } from './app-ssr-state.service';

describe('AppSsrStateService', () => {
  let service: AppSsrStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSsrStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
