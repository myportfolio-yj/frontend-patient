import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces/login-request.interface';
import { LoginService } from 'src/app/services/login.service';
import { LOCAL_STORAGE } from 'src/app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  @ViewChild('myForm') myForm!: NgForm;

  formData: LoginRequest = {
    email: '',
    password: ''
  };

  login(form: any) {
    // Verifica si el formulario es válido
    if (form.valid) {
      this.postLogin(this.formData);
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error u otras acciones
      console.log('El formulario no es válido');
    }
  }

  postLogin(formData: LoginRequest): void {
    this.loginService
      .postLogin(formData)
      .then((data) => {
        localStorage.setItem(LOCAL_STORAGE.USER, data.id);
        this.myForm.resetForm();
        this.router.navigate(["session/home"]); 
      }).catch(err => {
        console.log(err);
      });
  }

  register(){
    this.router.navigate(["auth/register"]); 
  }

}
