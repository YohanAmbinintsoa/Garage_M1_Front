import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-rdv',
  imports: [CommonModule, ButtonModule, CardModule,FormsModule,
    ReactiveFormsModule,SelectModule,CalendarModule, ToastModule],
  templateUrl: './rdv.component.html',
  styleUrl: './rdv.component.css'
})
export class RdvComponent implements OnInit {

  rdvForm!: FormGroup;
  cars: any[] = [];
  services: any[] = [];
  displayDialog: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService, private cookieService : CookieService) {}

  ngOnInit() {
    this.rdvForm = this.fb.group({
      service: ['', Validators.required],
      car: ['', Validators.required],
      rdvDate: ['', Validators.required],
      remark: ['']
    });

    this.fetchUserCars();
    this.fetchServices();
  }

  private getAuthHeaders(): HttpHeaders {
      const token = this.cookieService.get("token");
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }

  // Fetch user-specific cars
  fetchUserCars() {
    this.http.get<any[]>(environment.API_URL+'/cars/my-cars', {
      headers: this.getAuthHeaders()
    }).subscribe(
      (data) => { 
        this.cars = data.map(car => ({ label: car.designation, value: car._id }));
      },
      (error) => { console.error('Error fetching user cars', error); }
    );
  }

  // Fetch all services
  fetchServices() {
    this.http.get<any[]>(environment.API_URL+'/services',{
      headers: this.getAuthHeaders()
    }).subscribe(
      (data) => { 
        this.services = data.map(service => ({ label: service.designation, value: service._id }));
      },
      (error) => { console.error('Error fetching services', error); }
    );
  }

  submitRDV() {
    if (this.rdvForm.invalid) return;

    this.http.post(environment.API_URL+'/rdvs', this.rdvForm.value,{
      headers: this.getAuthHeaders()
    }).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'RDV added successfully' });
        this.rdvForm.reset();
        this.displayDialog = false;
      },
      (error) => {
        console.error('Error creating RDV', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add RDV' });
      }
    );
  }

}
