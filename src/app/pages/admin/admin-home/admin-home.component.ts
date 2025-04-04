import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ChartModule } from 'primeng/chart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-home',
  imports: [CardComponent, ChartModule, CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  data: any;
  options: any;

  rdvs: any[] = [];

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit(): void {
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
    this.getRdvs();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get("token");
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getRdvs(): void {
    this.http.get<any[]>(environment.API_URL + '/rdvs', {
      headers: this.getAuthHeaders()
    })
      .subscribe(data => {
        this.rdvs = data.filter(rdv => rdv.state === 0 || rdv.state === 5);
      });
  }

  // Validate an RDVenvir
  validateRdv(rdvId: string): void {
    this.http.patch(`/api/rdvs/${rdvId}/validate`, { state: 5 })
      .subscribe(() => {
        this.getRdvs(); // Refresh list after validation
      });
  }


}
