import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  itemTypeDocument = [
    {
      name: 'DNI',
      value: '1'
    },
    {
      name: 'OTROS',
      value: '2'
    }
  ];

  listDocument: string = '';
  error: any;

  constructor(private registerService: RegisterService){

    this.getSavingAccountDetail();


  }

  getSavingAccountDetail(): void {
    this.registerService
      .getTypeDocument()
      .then((data) => {
        this.listDocument = JSON.stringify(data);
        console.log(data);
      }).catch(e => {
        this.error = JSON.stringify(e);
      });
  }

}
