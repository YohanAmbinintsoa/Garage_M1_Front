import { Component } from '@angular/core';
import { DynamicCrudComponent } from '../dynamic-crud/dynamic-crud.component';
import { carBrand, carModel } from '../../constants/BackendModels';

@Component({
  selector: 'app-home',
  imports: [DynamicCrudComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  carBrand : any[] = carBrand;
  carModel : any[] = carModel;
}
