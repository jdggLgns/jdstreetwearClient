import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEmployeeDialogComponent } from './components/add-employee-dialog/add-employee-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditEmployeeDialogComponent } from './components/edit-employee-dialog/edit-employee-dialog.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { DiscountsComponent } from './components/discounts/discounts.component';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';
import { AddDiscountDialogComponent } from './components/add-discount-dialog/add-discount-dialog.component';
import { EditDiscountDialogComponent } from './components/edit-discount-dialog/edit-discount-dialog.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { FinishPurchaseComponent } from './components/finish-purchase/finish-purchase.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SigninComponent,
    AdminComponent,
    CustomerComponent,
    EmployeesComponent,
    EmployeeComponent,
    AddEmployeeDialogComponent,
    EditEmployeeDialogComponent,
    DiscountsComponent,
    OrdersComponent,
    ProductsComponent,
    AddProductDialogComponent,
    EditProductDialogComponent,
    AddDiscountDialogComponent,
    EditDiscountDialogComponent,
    ProductSearchComponent,
    ProductDetailComponent,
    CartComponent,
    FinishPurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
