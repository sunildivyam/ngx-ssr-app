import { TestBed } from '@angular/core/testing';

import { AppSitemapService } from './app-sitemap.service';

describe('AppSitemapService', () => {
  let service: AppSitemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppSitemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
