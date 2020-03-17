import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsUserComponent } from './feeds-user.component';

describe('FeedsUserComponent', () => {
  let component: FeedsUserComponent;
  let fixture: ComponentFixture<FeedsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
