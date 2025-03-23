import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-dynamic-crud',
  templateUrl: './dynamic-crud.component.html',
  styleUrls: ['./dynamic-crud.component.css'],
  imports: [CommonModule, ReactiveFormsModule, TableModule, ButtonModule, PaginatorModule, DialogModule,
    FloatLabelModule, InputTextModule,ToastModule, ConfirmDialogModule, SelectModule
  ]
})
export class DynamicCrudComponent implements OnInit {
  @Input() title!: string;
  @Input() endpoint!: string;
  @Input() fields!: { name: string; accessor: string; type: string; required: boolean; optionsEndpoint?: string }[];

  form!: FormGroup;
  editForm!: FormGroup;
  dataList: any[] = [];
  editingId: number | null = null;
  selectOptions: { [key: string]: any[] } = {};

  first = 0;
  rows = 10;
  paginatedData: any[] = [];

  visibleInsert = false;
  visibleEdit = false;
  selectedItem: any = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.initializeForms();
    this.loadData();
    this.loadSelectOptions();
  }

  initializeForms() {
    const formGroup: any = {};
    this.fields.forEach(field => {
      formGroup[field.name] = field.required ? [null, Validators.required] : [null];
    });
    this.form = this.fb.group(formGroup);
    this.editForm = this.fb.group(formGroup); // Initialize editForm properly
  }

  loadData() {
    this.apiService.getAll(this.endpoint).subscribe(response => {
      this.dataList = response;
      this.updatePaginatedData();
    });
  }

  loadSelectOptions() {
    this.fields.forEach(field => {
      if (field.type === 'select' && field.optionsEndpoint) {
        this.apiService.getAll(field.optionsEndpoint).subscribe(response => {
          if (response && Array.isArray(response)) {
            this.selectOptions[field.name] = response.map((item: any) => ({
              label: item[field.accessor], 
              value: item._id 
            }));
          } else {
            this.selectOptions[field.name] = [];
          }
          console.log(this.selectOptions[field.name])
        });
      }
    });
  }

  updatePaginatedData() {
    this.paginatedData = this.dataList.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedData();
  }

  formatField(item:any, field: any): string {
    let value=this.getDisplayValue(item, field)
    if (typeof value === 'number') {
      return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2 }).format(value);
    } else if (this.isDate(value)) {
      return new Date(value).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
    return value;
  }

  getFieldClass(value: any): string {
    if (typeof value === 'number') {
      return 'text-right font-bold text-blue-600';
    } else if (this.isDate(value)) {
      return 'text-green-500 italic';
    }
    return 'text-gray-700';
  }

  private isDate(value: any): boolean {
    return !isNaN(Date.parse(value));
  }

  getDisplayValue(item: any, field: any): string {
    if (field.type === 'select' && this.selectOptions[field.name]) {
      const selectedOption = this.selectOptions[field.name].find(opt => opt.value === item[field.accessor]);
      return selectedOption ? selectedOption.label : 'N/A';
    }
    return item[field.accessor] || 'N/A';
  }

  showInsertDialog() {
    this.form.reset();
    this.visibleInsert = true;
  }

  submitForm() {
    if (this.form.invalid) return;

    const formData = this.form.value;

    if (this.editingId === null) {
      this.apiService.create(this.endpoint, formData).subscribe(() => {
        this.loadData();
        this.form.reset();
        this.visibleInsert = false; // Close modal
      });
    } else {
      this.apiService.update(this.endpoint, this.editingId, formData).subscribe(() => {
        this.loadData();
        this.form.reset();
        this.editingId = null;
        this.visibleInsert = false;
      });
    }
    this.visibleInsert=false;
  }

  showEditDialog(item: any) {
    this.selectedItem = item;
    this.editForm.patchValue(item);
    this.visibleEdit = true;
  }

  updateItem() {
    if (!this.selectedItem) return;
    console.log(this.selectedItem)

    const updatedData = { ...this.selectedItem, ...this.editForm.value };

    this.apiService.update(this.endpoint, this.selectedItem._id, updatedData).subscribe(() => {
      this.loadData();
      this.visibleEdit = false;
    });
  }

  deleteItem(id: number) {
    this.apiService.deleteIt(this.endpoint, id).subscribe(() => {
      this.loadData();
    });
  }

  trackByFn(index: number, item: any) {
    return item._id; 
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}