import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogServicesComponent } from './dog-services.component';

describe('DogServicesComponent', () => {
  let component: DogServicesComponent;
  let fixture: ComponentFixture<DogServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DogServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
