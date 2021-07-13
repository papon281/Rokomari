import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginPayload } from '../login-payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayLoad: LoginPayload;

  constructor(private authService: AuthService, private router: Router) { 
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayLoad = {
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loginPayLoad.username = this.loginForm.get('username').value;
    this.loginPayLoad.password = this.loginForm.get('password').value;
    
      this.loginPayLoad.username = this.loginForm.get('username').value;
      this.loginPayLoad.password = this.loginForm.get('password').value;
  
      this.authService.login(this.loginPayLoad).subscribe(data => {
        if (data) {
          console.log('login success');
          this.router.navigateByUrl('/home');
        } else {
          console.log('Login failed');
        }
      });
    }
  }
