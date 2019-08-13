import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
