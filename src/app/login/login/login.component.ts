import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loginBoxClass = '';
  message = '';
  avatarState = 'idle';
  awaitingAvatar = 'assets/images/hourglass.svg';
  awaitingText = 'waiting...';
  remember: 0;
  currentUser: User['username'];

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: ['']
      });

      // this.f.username.setValue("johncandy@holywood.com");
      // this.f.password.setValue("sugar123");
  }

  get f() { return this.loginForm.controls; }

  async onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) { return; }

    this.loginBoxClass = 'processing spin';

    await this.delay(5000); /** Remove this for production */

    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .then(async data => {

            await this.delay(5000); /** Remove this for production */

            this.currentUser = data.username;
            this.loginBoxClass = 'box-container--invert';
            this.awaitingAvatar = data.picture;
            this.awaitingText = data.firstName;

            await this.delay(5000); /** Delay for user can see the interface animation */
            this.router.navigate(['/home']);
        }).catch(async error => {
            this.submitted = false;
            this.message = error.error.message;
            this.loginBoxClass = '';

            /** Clear message of wrong pass */
            await this.delay(5000).then( () => {
              this.message = '';
            });

        });
  }

  onFocus = (state: string) => this.avatarState = state;
  onFocusOut = () => this.avatarState = 'idle';

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
