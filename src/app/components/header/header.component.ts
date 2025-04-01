import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../services/auth.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [MenubarModule, AvatarModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  constructor(public authService: AuthService, private router: Router) { }

  user: any

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.items = [
      { label: 'Se deconnecter', icon: 'pi pi-power-off', command: () => this.logOut() },
    ];
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
