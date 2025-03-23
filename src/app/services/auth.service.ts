import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRole: string = 'user';

  constructor(private cookie : CookieService){}

  isConnected(): boolean {
    const token = this.cookie.get('token');
    return token !== undefined && token !== null && token !== '';
  }

  getUserRole(): string {
    const role = this.cookie.get('role');
    switch (role) {
      case "10":
        this.userRole="admin"
        break;
      case "5":
        this.userRole="mecano"
        break;
      default:
        break;
    }
    return this.userRole; 
  }
}
