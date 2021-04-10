import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAircraftComponent } from './delete-aircraft.component';

describe('DeleteAircraftComponent', () => {
  let component: DeleteAircraftComponent;
  let fixture: ComponentFixture<DeleteAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAircraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
