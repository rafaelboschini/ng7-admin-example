import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  message = "msg default";
  
  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private authenticationService: AuthenticationService) { 
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) { return; }

    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .then(data => {
            this.router.navigate(['/home']);
        }).catch(error => {
            this.submitted = false;
            this.message = error.error.message;
        });
  }  

}
