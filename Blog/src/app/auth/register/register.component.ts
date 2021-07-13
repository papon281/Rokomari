import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { RegisterPayload } from '../register-paylod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.registerForm = this.formBuilder.group({
      name: '',
      username: '',
      email: '',
      password:'',
      confirmPassword: ''
    });
    this.registerPayload = {
      name: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.registerPayload.name = this.registerForm.get("name").value;
    this.registerPayload.userName = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;

    this.authService.register(this.registerPayload).subscribe(data =>{
      console.log('Registration Success');
      this.router.navigateByUrl('/login');
    }, error =>{
      console.log('Registration failed');
    });
  }
}
