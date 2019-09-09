import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
    { path: '', component: UserListComponent, pathMatch: 'full' },
    { path: ':id', component: UserFormComponent },
    { path: 'new', component: UserFormComponent },
    { path: 'register', component: UserFormComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
