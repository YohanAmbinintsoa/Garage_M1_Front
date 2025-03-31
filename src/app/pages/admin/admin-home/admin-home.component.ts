import { Component } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-admin-home',
  imports: [CardComponent, ChartModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['Apple', 'Samsung', 'Google', 'Xiaomi'],
      datasets: [
        {
          data: [40, 25, 20, 15], 
          
        }
      ]
    };

    this.options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  }
}
