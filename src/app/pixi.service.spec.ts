import { TestBed } from '@angular/core/testing';

import { PixiService } from './pixi.service';

describe('PixiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PixiService = TestBed.get(PixiService);
    expect(service).toBeTruthy();
  });
});
