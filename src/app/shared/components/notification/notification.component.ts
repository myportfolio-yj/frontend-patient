import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/interfaces/alert.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  alert: Alert = {
    showAlert: false,
    message: ''
  };
  private alertSubscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService
  ) { }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.alertSubscription = this.dataService.alert.subscribe((alert: Alert) => {
      this.alert = alert;
    })
  }

}
