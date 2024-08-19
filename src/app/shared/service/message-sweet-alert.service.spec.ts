import { TestBed } from '@angular/core/testing';

import { MessageSweetAlertService } from './message-sweet-alert.service';

describe('MessageSweetAlertService', () => {
  let service: MessageSweetAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageSweetAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
