import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [UserListComponent, UserFormComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
