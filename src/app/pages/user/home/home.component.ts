import { Component, OnInit } from '@angular/core';
import { DynamicCrudComponent } from '../../../components/dynamic-crud/dynamic-crud.component';
import { car } from '../../../constants/BackendModels';
import { RdvComponent } from '../../../components/rdv/rdv.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [DynamicCrudComponent, RdvComponent,FullCalendarModule,CardModule, DialogModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  car : any[] = car;
  events: any[] = []; // Stores RDVs
  displayDialog: boolean = false;
  selectedRDV: any = null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(private http: HttpClient, private cookieService : CookieService) {}

  ngOnInit() {
    this.fetchRDVs();
  }

  private getAuthHeaders(): HttpHeaders {
        const token = this.cookieService.get("token");
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }

  fetchRDVs() {
    this.http.get<any[]>(environment.API_URL+'/rdvs',{
      headers: this.getAuthHeaders()
    }).subscribe(
      (data) => {
        this.events = data.map(rdv => ({
          title: `RDV: ${rdv.service.designation}`,
          start: rdv.rdvDate,
          backgroundColor: '#007bff', // Customize event color
          textColor: '#fff',
          extendedProps: {
            rdvDate : rdv.rdvDate,
            car: rdv.car.designation,
            remark: rdv.remark
          }
        }));
        this.calendarOptions.events = this.events; // Update calendar events
      },
      (error) => {
        console.error('Error fetching RDVs', error);
      }
    );
  }

  handleEventClick(eventInfo: any) {
    this.selectedRDV = eventInfo.event.extendedProps;
    this.displayDialog = true;
  }
}
