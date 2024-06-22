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
      (user: any) => {
        switch (user.role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'employee':
            this.router.navigate(['/employee']);
            break;
          case 'customer':
            this.router.navigate(['/customer']);
            break;
          default:
            this.router.navigate(['/login']);
            break;
        }
      },
      error => alert('Login Failed')
    );
  }
}
