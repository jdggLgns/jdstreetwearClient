import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AddEmployeeDialogComponent } from '../add-employee-dialog/add-employee-dialog.component';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog/edit-employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  userName: string = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    const user = this.authService.getUser();
    if (user && user.role === 'admin') {
      this.userName = user.firstName;
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => this.employees = employees,
      error => console.error('Error loading employees:', error)
    );
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result).subscribe(
          () => this.loadEmployees(),
          error => console.error('Error adding employee:', error)
        );
      }
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      width: '400px',
      data: { ...employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(result).subscribe(
          () => this.loadEmployees(),
          error => console.error('Error updating employee:', error)
        );
      }
    });
  }


  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => this.loadEmployees(),
      error => console.error('Error deleting employee:', error)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
