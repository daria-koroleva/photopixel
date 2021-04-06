import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainfeedPostComponent } from './mainfeed-post.component';

describe('MainfeedPostComponent', () => {
  let component: MainfeedPostComponent;
  let fixture: ComponentFixture<MainfeedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainfeedPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainfeedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
