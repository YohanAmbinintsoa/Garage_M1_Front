import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { roleRoutes } from '../../constants/RoleRoutes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type Role = keyof typeof roleRoutes;

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private cookieService: CookieService) { }
  links: any[] = [];

  ngOnInit() {
    const role = this.cookieService.get('role') as Role;
    this.links=this.links = roleRoutes[role] || roleRoutes['user'];
  }
}
