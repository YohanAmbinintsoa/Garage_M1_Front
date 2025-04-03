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
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { KnobModule } from 'primeng/knob';

@Component({
  selector: 'app-mecano-details-service',
  imports: [
    KnobModule,
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    RouterModule ,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    Select,
    InputTextModule,
    PanelModule,
    FieldsetModule
  ],
  templateUrl: './mecano-details-service.component.html',
  styleUrl: './mecano-details-service.component.css'
})

export class MecanoDetailsServiceComponent implements OnInit {
  addArticleForm!: FormGroup;
  advancementForm!: FormGroup;
  services: any[] = [];
  articles: any[] = [];
  displayDialog: boolean = false;
  DetailsService: any = {};
  usedArticles: any[] = []; 
  actualAdvancement:number = 0;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private messageService: MessageService, private cookieService: CookieService) { }

  ngOnInit() {
    let nbrArticle = 3;
    let actualAdvancementFromDB = 40;
    this.addArticleForm = this.fb.group({
      quantity: ['',  [Validators.required, Validators.max(nbrArticle)]],
    });

    this.advancementForm = this.fb.group({
      actualAdvancement: [actualAdvancementFromDB, [Validators.min(0), Validators.max(100)]]
  });
  

  
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
    this.route.paramMap.subscribe(params => {
      console.log('Route Param ID:', params.get('id'));
    });

    this.DetailsService = {
      "clientName":"JEAN JACQUE",
      "serviceDesignation":"Lavage",
      "entryDate":"20/04/2025",
      "rmqClient":"RAS",
    };

    this.usedArticles = [
      {
        "designation":"lave main", 
        "quantity": "2"
      },
      {
        "designation":"lave pied", 
        "quantity": "2"
      },
      {
        "designation":"lave main", 
        "quantity": "2"
      },
      {
        "designation":"lave pied", 
        "quantity": "2"
      }
    ];
  }

  addArticle() {}

  submitAdvancement() {}

  increaseAdvancement() {
      let value = this.advancementForm.get('actualAdvancement')?.value;
      if (value < 100) {
          this.advancementForm.patchValue({ actualAdvancement: value + 10 });
      }
  }

  decreaseAdvancement() {
      let value = this.advancementForm.get('actualAdvancement')?.value;
      if (value > 0) {
          this.advancementForm.patchValue({ actualAdvancement: value - 10 });
      }
  }
}
