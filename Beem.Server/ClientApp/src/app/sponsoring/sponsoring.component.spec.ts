import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoringComponent } from './sponsoring.component';

describe('SponsoringComponent', () => {
  let component: SponsoringComponent;
  let fixture: ComponentFixture<SponsoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
