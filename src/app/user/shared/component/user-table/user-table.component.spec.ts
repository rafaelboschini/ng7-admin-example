import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableComponent } from './user-table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';
import { UserService } from 'src/app/_services/user/user.service';
import { UserRoutingModule } from 'src/app/user/user.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserModule } from 'src/app/user/user.module';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        UserRoutingModule,
        UserModule
      ],
      providers: [ fakeBackendProvider, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty row information', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.empty-row')).toBeTruthy();
  });

  it('should have table header', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.user-table__header')).toBeTruthy();
    expect(compiled.querySelectorAll('.user-table__header div').length).toBe(6);
  });
});
