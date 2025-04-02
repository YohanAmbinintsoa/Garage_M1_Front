import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router'; 
import { ToastModule } from 'primeng/toast';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-mecano-details-service',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    RouterModule ,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    Select
  ],
  templateUrl: './mecano-details-service.component.html',
  styleUrl: './mecano-details-service.component.css'
})

export class MecanoDetailsServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  services: any[] = [];
  articles: any[] = [];
  displayDialog: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private messageService: MessageService, private cookieService: CookieService) { }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      designation: ['', Validators.required],
      mandatoryArticles: this.fb.array([])
    });
    this.route.paramMap.subscribe(params => {
      console.log('Route Param ID:', params.get('id'));
    });
  }

  submitService() {}
  addArticle() {}
  removeArticle(index: number) {}
}
