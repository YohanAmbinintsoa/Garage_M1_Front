import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-mecano-service',
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    RouterModule ,
  ],
  templateUrl: './mecano-service.component.html',
  styleUrl: './mecano-service.component.css'
})
export class MecanoServiceComponent implements OnInit {
  services: any[] = [];
  ngOnInit() {
    //function pour l'inti
    this.services = [    {
      "id":"1",
      "date": "2025-10-13",
      "client":"Zoky mtapy",
      "service":"manasa"
    },
    {
      "id":"2",
      "date": "2024-09-28",
      "client":"Zoky mlamina",
      "service":"manadio"
    }
  ];
  }
}
