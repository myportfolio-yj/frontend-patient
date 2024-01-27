import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  title = 'apposmv';
  notificationMessage = 'Mi primer mensaje';
  showNotification = true;
  private loadingSubscription: Subscription = new Subscription();

  constructor(
    private dataService: DataService
  ){}
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.loadingSubscription = this.dataService.loading.subscribe((value: boolean) => {
      this.isLoading = value;
    })
  }
}
