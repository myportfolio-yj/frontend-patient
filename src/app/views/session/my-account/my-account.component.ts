import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypographyAlign } from 'src/app/shared/components/typography/typography.enum';
import { Option } from './../../../shared/components/select/option.interface';
import { RegisterService } from 'src/app/services/register.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileRequest } from 'src/app/interfaces/profile-request.interface';
import { ClientResponse } from 'src/app/interfaces/client-response.interface';
import { LOCAL_STORAGE } from 'src/app/utils/constants';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent  implements OnInit {

  myForm!: FormGroup;
  
  itemTypeDocument: Option[] = [
    {
      name: '',
      value: ''
    }
  ];
  itemDefault: Option = {
    name: '',
    value: ''
  };

  clientData: ClientResponse = {} as ClientResponse;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private profileService: ProfileService
  ){
    this.myForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      celular: ['', Validators.required],
      fijo: ['', Validators.required],
      idTipoDocumento: ['', Validators.required],
      documento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getDocumentType();
    const clientId = localStorage.getItem(LOCAL_STORAGE.USER);
    if(clientId){
      this.getClientId(clientId); 
    }
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

  getClientId(clientId: string): void {
    this.profileService
      .getClientId(clientId)
      .then((data) => {
        //console.log(data);
        this.clientData = data;
        this.updateForm();
      }).catch(err => {
        console.log(err);
      });
  }

  updateProfile() {
    if (this.myForm.valid) {
      // Realizar el registro si el formulario es válido
      const formData = this.myForm.value;
      //this.putProfile(formData);
      console.log(formData);
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos requeridos.');
    }
  }

  putProfile(idClient: string, formData: ProfileRequest): void {
    this.profileService
      .putProfile(idClient, formData)
      .then((data) => {
        console.log(data);
        this.clearForm();
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
      console.error('Control "idTipoDocumento" no encontrado en el formulario.');
    }
  }

  updateForm(): void {
    const nombresControl = this.myForm.get('nombres');
    const apellidosControl = this.myForm.get('apellidos');
    const celularControl = this.myForm.get('celular');
    const fijoControl = this.myForm.get('fijo');
    const idTipoDocumentoControl = this.myForm.get('idTipoDocumento');
    const documentoControl = this.myForm.get('documento');
    //this.itemSelected.name = 'DNI';
    //this.itemSelected.value = '657f9eb8e107a35550f6fc5c';
    this.itemDefault.name = this.clientData.tipoDocumento.tipoDocumento;
    this.itemDefault.value = this.clientData.tipoDocumento.id;

    if (nombresControl && apellidosControl && celularControl && fijoControl && idTipoDocumentoControl && documentoControl) {
      nombresControl.setValue(this.clientData.nombres);
      apellidosControl.setValue(this.clientData.apellidos);
      celularControl.setValue(this.clientData.celular);
      fijoControl.setValue(this.clientData.fijo);
      idTipoDocumentoControl.setValue(this.clientData.tipoDocumento.id);
      documentoControl.setValue(this.clientData.documento);
    } else {
      console.error('Control "nombres" no encontrado en el formulario.');
    }
  }

}
