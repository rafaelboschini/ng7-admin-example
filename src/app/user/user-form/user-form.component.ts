import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { UserService } from 'src/app/_services/user/user.service';
import { User, UserProfile } from 'src/app/_models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  selectedUser: User = new User();

  profiles: UserProfile[] = [
    {id: 0, name: 'Admin'},
    {id: 1, name: 'Viewer'}
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      username: ['', Validators.required],
      profile: ['', Validators.required],
      password: ['', [Validators.required]],
      cpf: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    if (!this.selectedUser.id) {
      /** Register new user */
      this.userService.register(this.userForm.value)
              .pipe(first())
              .subscribe(this.successHandler, this.errHandler);
    } else {
      /** Editing existing user */
      this.userService.update(this.selectedUser)
              .pipe(first())
              .subscribe(this.successHandler, this.errHandler);
    }
  }

  get f() { return this.userForm.controls; }

  errHandler(error) {
    this.submitted = false;
  }

  successHandler() {
    this.router.navigate(['/user']);
  }

  changeProfileValue(e) {
    this.f.profile.setValue(e.target.value, {
      onlySelf: true
    });
  }
}
