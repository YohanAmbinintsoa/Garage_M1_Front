import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [InputTextModule,ButtonModule,FloatLabelModule,ReactiveFormsModule, CommonModule,ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorMessage: string =""

  constructor(private http: HttpClient, private apiService: ApiService, private messageService: MessageService) {}

  onSubmit() {
    if (this.userForm.valid) {
      this.http.post('http://localhost:5000/auth/login', this.userForm.value)
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('token', response.token);
            console.log('Login successful!', response);
          },
          error: (err) => {
            this.errorMessage = err.error.message;
          }
        });
    }
  }
}
