import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/interfaces/register-request.interface';
import { RegisterService } from 'src/app/services/register.service';
import { Option } from './../../../shared/components/select/option.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  myForm!: FormGroup;
  
  itemTypeDocument: Option[] = [
    {
      name: '',
      value: ''
    }
  ];

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.getDocumentType();
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      fijo: ['', Validators.required],
      email: ['', Validators.required],
      idTipoDocumento: ['', Validators.required],
      documento: ['', Validators.required],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],
    });
  }

  getDocumentType(): void {
    this.registerService
      .getTypeDocuments()
      .then((data) => {
        const newTypeDocuments: Option[] = data.map((document) => ({
          name: document.tipoDocumento,
          value: document.id
        }));

        this.itemTypeDocument = newTypeDocuments;
      }).catch(err => {
        console.log(err);
      });
  }

  register() {
    if (this.myForm.valid) {
      // Realizar el registro si el formulario es válido
      const formData = this.myForm.value;
      this.postRegister(formData);
      console.log(formData);
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos requeridos.');
    }
  }

  postRegister(formData: RegisterRequest): void {
    this.registerService
      .postRegister(formData)
      .then((data) => {
        console.log(data);
        this.clearForm();
        this.router.navigate(["session/home"]); 
      }).catch(err => {
        console.log(err);
      });
  }

  clearForm(): void {
    this.myForm.reset();
  }

  changeDocument(event: any): void {
    const nombresControl = this.myForm.get('idTipoDocumento');

    if (nombresControl) {
      nombresControl.setValue(event.value);
    } else {
      console.error('Control "nombres" no encontrado en el formulario.');
    }
  }
}
