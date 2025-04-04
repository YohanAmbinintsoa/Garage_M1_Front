import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
  selector: 'app-stock-actual',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    DialogModule, 
    Select
  ],
  templateUrl: './stock-actual.component.html',
  styleUrl: './stock-actual.component.css'
})
export class StockActualComponent implements OnInit {
  serviceForm!: FormGroup;
  addStockForm!: FormGroup;
  services: any[] = [];
  articleStock: any[] = [];
  displayDialog: boolean = false;
  articles: any[] = [];
  constructor(private fb: FormBuilder, private http: HttpClient, private messageService: MessageService, private cookieService: CookieService) { }
  ngOnInit() {
    this.serviceForm = this.fb.group({
      designation: ['', Validators.required],
      mandatoryArticles: this.fb.array([])
    });
    this.addStockForm = this.fb.group({
      quantity: ['',  [Validators.required]],
      pu: ['',  [Validators.required]],
    });
    this.fetchArticleStock();
    this.fetchArticles();
  }
  fetchArticleStock()
  {
    this.articleStock = [
      {
        "designation":"colgate",
        "quantity":"24",
        "pu":14000
      },
      {
        "designation":"Lave pied",
        "quantity":"51",
        "pu":5400
      }
    ]; 
  }
  fetchArticles(){
    //article from DB
    this.articles = [
      {
        "id":"1",
        "designation":"lave main", 
      },
      {
        "id":"2",
        "designation":"lave pied", 
      },
      {
        "id":"1",
        "designation":"lave main", 
      },
      {
        "id":"2",
        "designation":"lave pied", 
      }
    ];

  }

  addToStock(){}
}
