import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeEditorComponent } from './bike-editor.component';

describe('BikeEditorComponent', () => {
  let component: BikeEditorComponent;
  let fixture: ComponentFixture<BikeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
