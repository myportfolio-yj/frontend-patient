import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _loading$ = new Subject<boolean>();
  private _alert$ = new Subject<Alert>();
  timer: any;

  constructor() { }

  setLoading(value: boolean): void {
    this._loading$.next(value);
  }

  setAlert(params: Alert): void {
    this._alert$.next(params);
    if(params.showAlert) {
      this.timer = setTimeout(() => {
        this._alert$.next( { showAlert: false, message: '' });
      }, 4000);
    }else {
      clearTimeout(this.timer);
    }
  }

  get loading(): Subject<boolean> {
    return this._loading$;
  }

  get alert(): Subject<Alert> {
    return this._alert$;
  }
}
