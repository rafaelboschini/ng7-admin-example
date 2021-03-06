import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { AuthenticationService } from 'src/app/_services/auth/authentication.service';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];
  searchTerm = '';

  showModal = false;
  deleteIdUser: number;

  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.bindUserTable();
  }

  async bindUserTable() {
    /** Get all users registered in application */
    await this.userService.getAll().subscribe(data => {
      this.users = data as User[];
    });
  }

  get userData() {
    if (!this.users) {
      return [];
    }

    if (this.searchTerm === '' || this.searchTerm === undefined) {
      return this.users;
    }

    return this.users.filter( item => {
      return item.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 ||
              item.username.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  searchByTerm(term = '') {
    this.searchTerm = term;
  }

}
