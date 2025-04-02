import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-mecano',
  imports: [InputTextModule, ButtonModule, FloatLabelModule, ReactiveFormsModule, CommonModule, ToastModule, TooltipModule],
  templateUrl: './login-mecano.component.html',
  styleUrl: './login-mecano.component.css'
})
export class LoginMecanoComponent {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role : new FormControl(5)
  });

  errorMessage: string = ""

  onSubmit() {
    this.router.navigate(['/mecano/home']);
/*    if (this.userForm.valid) {
      this.http.post(environment.API_URL + '/auth/login', this.userForm.value)
        .subscribe({
          next: (response: any) => {
            this.authService.setUser(response);
            console.log('Login successful!', response);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
          }
        });
    }*/
  }
}
