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

@Component({
  selector: 'app-login-admin',
  imports: [InputTextModule, ButtonModule, FloatLabelModule, ReactiveFormsModule, CommonModule, ToastModule, TooltipModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role : new FormControl(10)
  });

  errorMessage: string = ""

  onSubmit() {
    if (this.userForm.valid) {
      this.http.post(environment.API_URL + '/auth/login', this.userForm.value)
        .subscribe({
          next: (response: any) => {
            this.cookieService.set('token', response.token);
            this.cookieService.set('role', response.user.role);
            console.log('Login successful!', response);
            this.router.navigate(['/admin/home']);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
          }
        });
    }
  }
}
