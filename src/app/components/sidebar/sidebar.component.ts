import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { roleRoutes } from '../../constants/RoleRoutes';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../../services/auth.service';


type Role = keyof typeof roleRoutes;

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, TooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private authService : AuthService) { }
  links: any[] = [];

  ngOnInit() {
    console.log(this.authService.getUserRole() as Role)
    this.links = roleRoutes[this.authService.getUserRole() as Role] || roleRoutes['user'];
  }
}
