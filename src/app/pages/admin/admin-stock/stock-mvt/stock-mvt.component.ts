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

@Component({
  selector: 'app-stock-mvt',
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
  ],
  templateUrl: './stock-mvt.component.html',
  styleUrl: './stock-mvt.component.css'
})
export class StockMvtComponent implements OnInit {
  listMvt: any[] = [];

  ngOnInit() {
    this.fetchListMvt();
  }
  fetchListMvt()
  {
    this.listMvt = [
      {
        "date":"20-04-2025",
        "designation":"Lave main",
        "quantity":24,
        "type":0,
        "unitPrice":14000
      },
      {
        "date":"20-03-2024",
        "designation":"Bardhal 10w60",
        "quantity":4,
        "type":5,
        "unitPrice":170000
      },
    ];
  }
}
