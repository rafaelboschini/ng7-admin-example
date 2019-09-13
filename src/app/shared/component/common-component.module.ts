import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListTableComponent } from './list-table/list-table.component';

@NgModule({
  declarations: [ ListTableComponent ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [ListTableComponent]
})
export class CommonComponentModule { }
