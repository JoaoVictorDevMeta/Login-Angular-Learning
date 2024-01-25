import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-mach.directive';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?:[a-zA-Z_]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router){}

  get fullName(){
    return this.registerForm.controls['fullName'];
  }
  get email(){
    return this.registerForm.controls['email'];
  }
  get password(){
    return this.registerForm.controls['password'];
  }
  get confirmPassword(){
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails(){
    const data = {...this.registerForm.value };
    delete data.confirmPassword;

    this.authService.registerUser(data as User).subscribe(
      response => {
        console.log("user registered successfully");
        this.router.navigate(['login']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
