import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAircraftComponent } from './create-aircraft.component';

describe('CreateAircraftComponent', () => {
  let component: CreateAircraftComponent;
  let fixture: ComponentFixture<CreateAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAircraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
