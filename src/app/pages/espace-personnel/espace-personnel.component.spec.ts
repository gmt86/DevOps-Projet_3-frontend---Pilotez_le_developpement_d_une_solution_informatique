import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacePersonnelComponent } from './espace-personnel.component';

describe('EspacePersonnelComponent', () => {
  let component: EspacePersonnelComponent;
  let fixture: ComponentFixture<EspacePersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacePersonnelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EspacePersonnelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
