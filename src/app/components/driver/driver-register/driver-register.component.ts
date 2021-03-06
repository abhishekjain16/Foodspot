import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-driver-register',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  username: string;
  password: string;
  verifyPassword: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  errorFlag: boolean;
  errorMsg = '';
  success = false;
  restaurantId: string;
  restaurantName: string;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.restaurantId = params['restaurantId'];
        }
      );
  }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;
    this.lastName = this.registerForm.value.lastName;
    this.firstName = this.registerForm.value.firstName;
    this.email = this.registerForm.value.email;
    this.phone = this.registerForm.value.phone;
    const user  = {
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      role: 'Driver',
      restaurantId: this.restaurantId
    };

    this.userService.createUser(user)
      .subscribe(
        (newUser: any) => {
          this.errorFlag = false;
          this.success = true;
        },
        (error: any) => {
          this.errorFlag = true;
        }
      );
  }
}
