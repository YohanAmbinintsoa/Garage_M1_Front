import { Component } from '@angular/core';
import { DynamicCrudComponent } from '../../../components/dynamic-crud/dynamic-crud.component';
import { article, articleCategory, carBrand, carModel } from '../../../constants/BackendModels';

@Component({
  selector: 'app-admin-settings',
  imports: [DynamicCrudComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent {
  carBrand: any[] = carBrand;
  carModel: any[] = carModel;
  articleCategory : any[] = articleCategory;
  article : any[] = article;
}
