import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-service',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    DialogModule, Select],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  services: any[] = [];
  articles: any[] = [];
  displayDialog: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService, private cookieService: CookieService) { }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      designation: ['', Validators.required],
      mandatoryArticles: this.fb.array([])
    });

    this.fetchServices();
    this.fetchArticles();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get("token");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  get mandatoryArticles() {
    return this.serviceForm.get('mandatoryArticles') as FormArray;
  }

  addArticle() {
    this.mandatoryArticles.push(this.fb.group({
      article: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    }));
  }

  removeArticle(index: number) {
    this.mandatoryArticles.removeAt(index);
  }

  fetchServices() {
    this.http.get<any[]>(environment.API_URL + '/services', {
      headers: this.getAuthHeaders()
    }).subscribe(
      (data) => { this.services = data; },
      (error) => { console.error('Error fetching services', error); }
    );
  }

  fetchArticles() {
    this.http.get<any[]>(environment.API_URL + '/articles', {
      headers: this.getAuthHeaders()
    }).subscribe(
      (data) => {
        this.articles = data.map((item: any) => ({
          label: item["designation"],
          value: item._id
        }));
      },
      (error) => { console.error('Error fetching articles', error); }
    );
    console.log(this.articles)
  }

  submitService() {
    if (this.serviceForm.invalid) {
      return;
    }

    this.http.post(environment.API_URL + '/services', this.serviceForm.value, {
      headers: this.getAuthHeaders()
    }).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Service added successfully' });
        this.fetchServices();
        this.serviceForm.reset();
        this.mandatoryArticles.clear();
        this.displayDialog = false;
      },
      (error) => {
        console.error('Error creating service', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add service' });
      }
    );
  }

}
