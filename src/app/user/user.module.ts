import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user.routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserSearchComponent } from './shared/component/user-search/user-search.component';
import { CommonComponentModule } from '../shared/component/common-component.module';
import { UserTableComponent } from './shared/component/user-table/user-table.component';

@NgModule({
  declarations: [ UserListComponent, UserFormComponent, UserSearchComponent, UserTableComponent ],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    FormsModule,
    CommonComponentModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
