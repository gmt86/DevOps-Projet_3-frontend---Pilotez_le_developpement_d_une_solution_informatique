import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacePersonnelLayoutComponent } from './espace-personnel-layout.component';

describe('EspacePersonnelLayoutComponent', () => {
  let component: EspacePersonnelLayoutComponent;
  let fixture: ComponentFixture<EspacePersonnelLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacePersonnelLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EspacePersonnelLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
