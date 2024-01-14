import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogServicesDetailsComponent } from './dog-services-details.component';

describe('DogServicesDetailsComponent', () => {
  let component: DogServicesDetailsComponent;
  let fixture: ComponentFixture<DogServicesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogServicesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogServicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
