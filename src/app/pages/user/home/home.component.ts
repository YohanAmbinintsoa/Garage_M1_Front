import { Component } from '@angular/core';
import { DynamicCrudComponent } from '../../../components/dynamic-crud/dynamic-crud.component';
import { car } from '../../../constants/BackendModels';

@Component({
  selector: 'app-home',
  imports: [DynamicCrudComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  car : any[] = car;
}
