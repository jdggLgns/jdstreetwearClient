import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  user: User = { firstName: '', lastName: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.user.role = 'customer';
    this.authService.register(this.user).subscribe(
      (response: any) => {
        if (response.status === 201) {
          alert('User registered successfully!');
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        alert(`Registration Failed: ${error.statusText}. Message: ${error.message}`);
      }
    );
  }
}
