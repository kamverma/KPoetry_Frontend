import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkitemComponent } from './add-workitem.component';

describe('AddWorkitemComponent', () => {
  let component: AddWorkitemComponent;
  let fixture: ComponentFixture<AddWorkitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkitemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
