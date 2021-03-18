import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainfeedComponent } from './mainfeed.component';

describe('MainfeedComponent', () => {
  let component: MainfeedComponent;
  let fixture: ComponentFixture<MainfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
