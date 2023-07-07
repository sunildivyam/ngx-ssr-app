import { Injectable } from '@angular/core';
import {
  AppState,
  AppStateParams,
} from '../interfaces/app-state.interface';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { AppDataService } from './app-data.service';
import { AppSsrStateService } from './app-ssr-state.service';
import { APP_STATE_KEYS } from '../constants/app-state.constants';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private appState$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>({});

  constructor(
    private appDataService: AppDataService,
    private appSsrStateService: AppSsrStateService,
  ) { }

  private isStateNameValid(stateName: string): boolean {
    return Object.keys(APP_STATE_KEYS).includes(stateName);
  }

  public get appState(): Observable<AppState> {
    return this.appState$.asObservable();
  }


  public get appStateValue(): AppState {
    return this.appState$.value;
  }

  public async setState(stateName: string, stateParams: AppStateParams = null): Promise<AppState> {
    if (!this.isStateNameValid(stateName)) throw new Error(`${stateName} state key does not exist in AppState. Please add it to APP_STATE_KEYS, before using it.`);

    // get state value from cache
    let stateValue: any = this.appState$.value[stateName];

    // ELSE get state value from SSR state
    if (!stateValue) {
      stateValue = this.appSsrStateService.getValue(stateName);
    }

    // ELSE get state value from data service
    if (!stateValue) {
      stateValue = await this.appDataService.getValue(stateName, stateParams);

      // Also save state value to SSR state
      this.appSsrStateService.setValue(stateName, stateValue);
    }

    // Save state value to cache

    const newAppState: AppState = {
      ...this.appState$.value,
      [stateName]: stateValue,
    }

    this.appState$.next(newAppState);

    // Return the new appState.
    return newAppState;
  }
}
