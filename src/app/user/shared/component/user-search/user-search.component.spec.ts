import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { UserSearchComponent } from './user-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from 'src/app/user/user.module';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        UserModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('shoud have icon in search container', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.search__button i').textContent).toBe('s');
  });

  it('shoud have correctly placeholder in input', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').getAttribute('placeholder')).toBe('Search Here');
  });

  it('should trigger EventEmitter on keypress', () => {

    spyOn(component.termChange, 'emit');

    const nativeElement = fixture.nativeElement;

    var e = new KeyboardEvent("keyup", {
      bubbles : true,
      cancelable : true,
      key : "q",
      shiftKey : true
    });

    nativeElement.querySelector('.search-container input').dispatchEvent(new KeyboardEvent('keydown', {'key': 'keyB'}));
    component.termChange.emit('B');
    
    fixture.detectChanges();
    
    expect(component.termChange.emit).toHaveBeenCalledWith('B');
    
  });

});
