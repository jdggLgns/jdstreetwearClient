import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        const user = this.authService.getUser();
        if (user.role === 'customer') {
          const customerId = this.authService.getCustomerIdFromStorage();
          if (customerId) {
            this.router.navigate(['/customer']);
          } else {
            console.error('Customer ID not found');
            this.router.navigate(['/login']);
          }
        } else {
          switch (user.role) {
            case 'admin':
              this.router.navigate(['/admin']);
              break;
            case 'employee':
              this.router.navigate(['/employee']);
              break;
            default:
              this.router.navigate(['/login']);
              break;
          }
        }
      },
      error => alert('Login Failed')
    );
  }
}
