import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  _searchTerm = "";
  
  constructor() {}

  ngOnInit() {
  }
  
  @Output() termChange = new EventEmitter();

  @Input()
  set searchTerm(term: string) {
    this._searchTerm = (term && term.trim());
  }
  
  keyPress() {
    this.termChange.emit(this._searchTerm);
  }
}
