import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PrivateLayoutComponent } from './private-layout.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrivateLayoutComponent', () => {
  let component: PrivateLayoutComponent;
  let fixture: ComponentFixture<PrivateLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateLayoutComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create brand and navbar', () => {
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.layout-container .brand')).toBeTruthy();
    expect(compiled.querySelector('.layout-container .nav')).toBeTruthy();
  });


});
