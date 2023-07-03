import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSpinnerService {
  loading$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  public start() {
    this.loading$.next(true);
  }

  public stop() {
    this.loading$.next(false);
  }


  public get isLoading(): boolean {
    return this.loading$.value;
  }

}
