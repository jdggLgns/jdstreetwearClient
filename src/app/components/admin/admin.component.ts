import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userName: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    console.log("Soy "+ user);
    if (user && user.role === 'admin') {
      this.userName = user.role;
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
