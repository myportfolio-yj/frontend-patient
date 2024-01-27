import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  @Input() message: string = '';
  @Input() isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // //Desaparece después de 4 segundos
    setTimeout(() => {
      this.isVisible = false;
    }, 4000);
  }

}
