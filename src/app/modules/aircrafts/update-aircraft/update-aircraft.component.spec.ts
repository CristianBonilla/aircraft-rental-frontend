import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAircraftComponent } from './update-aircraft.component';

describe('UpdateAircraftComponent', () => {
  let component: UpdateAircraftComponent;
  let fixture: ComponentFixture<UpdateAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAircraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
