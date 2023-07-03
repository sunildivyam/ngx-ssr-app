import {
  Inject,
  Injectable,
  PLATFORM_ID,
  StateKey,
  TransferState,
  makeStateKey,
} from '@angular/core';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import {
  AppState,
  AppStateValue,
  StateKeys,
} from '../interfaces/app-core.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { APP_STATE_KEYS } from '../constants/app-core.constants';
import { MenuItem } from '@annuadvent/ngx-common-ui/menu';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private appState$: BehaviorSubject<AppState>;
  private stateKeys: StateKeys;

  constructor(
    private utils: UtilsService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: string,
    private appConfigService: AppConfigService,
  ) {
    this.initAppState();
  }

  /**
   * Initializes appState with default values
   * @date 6/8/2023 - 4:00:24 PM
   *
   * @private
   */
  private initAppState(): void {
    // Make statekays ready for SSR
    this.stateKeys = {};
    const stateKeysArr = Object.values(APP_STATE_KEYS);
    stateKeysArr.forEach((value) => {
      this.stateKeys[value] = makeStateKey<AppStateValue>(value);
    });

    this.appState$ = new BehaviorSubject<AppState>({});
  }

  /**
   * Saves a stateKey and its data to SSR state.
   * @date 6/8/2023 - 3:59:58 PM
   *
   * @private
   * @param {StateKey<Array<Category>>} key
   * @param {Array<Category>} data
   */
  private saveToSsrState(
    key: StateKey<AppStateValue>,
    data: AppStateValue
  ): void {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(key, data);
    }
  }

  /**
   * Removes a stateKey and its data from SSR state.
   * @date 6/8/2023 - 3:59:32 PM
   *
   * @private
   * @param {StateKey<Array<Category>>} key
   */
  private removeFromSsrState(key: StateKey<AppStateValue>): void {
    if (isPlatformBrowser(this.platformId)) {
      this.transferState.remove(key);
    }
  }

  private catchFn(err) {
    return null;
  }

  /**
   * Gets AppStateItemvalue from cache or SSR
   * @date 6/8/2023 - 7:20:37 PM
   *
   * @private
   * @async
   * @param {string} appStateItemName
   * @returns {Promise<AppStateValue>}
   */
  private async getAppStateItemValueFromCacheOrSSRState(
    appStateItemName: string,
  ): Promise<AppStateValue> {
    const stateKey = this.stateKeys[appStateItemName];

    // serve it from cache, if available.

    let appStateItemValue: AppStateValue = this.utils.deepCopy(
      this.appState$.value[appStateItemName]
    );

    if (appStateItemValue) {
      return appStateItemValue;
    }

    // Else Serve from SSR transferState, if available and save to cache
    if (this.transferState.hasKey(stateKey)) {
      appStateItemValue = this.transferState.get(stateKey, null);

      if (appStateItemValue) {
        // Save to cache
        this.appState$.next({
          ...this.utils.deepCopy(this.appState$.value),
          [appStateItemName]: appStateItemValue,
        });
        // Remove from SSR
        this.removeFromSsrState(stateKey);
        return appStateItemValue;
      }
    }

    return appStateItemValue;
  }

  /**
   * Gets AppStateItemvalue from REST
   * @date 6/8/2023 - 7:21:04 PM
   *
   * @private
   * @async
   * @param {string} appStateItemName
   * @returns {Promise<AppStateValue>}
   */
  private async getAppStateItemValue(
    appStateItemName: string,
  ): Promise<AppStateValue> {
    // serve from cache or SSR
    let appStateItemValue = await this.getAppStateItemValueFromCacheOrSSRState(
      appStateItemName
    ).catch(this.catchFn);

    if (appStateItemValue) return appStateItemValue;

    // Else serve from from DB
    switch (appStateItemName) {
      case APP_STATE_KEYS.mainNavItems:
        // place to make http calls for data
        appStateItemValue = this.appConfigService.config.mainMenuItems;
        break;
      default:
      // NOTE: Add one separate switch case for each AppState items, above
    }

    if (appStateItemValue instanceof Array && !appStateItemValue.length) {
      appStateItemValue = null;
    }

    const copyOfappStateItemValue = this.utils.deepCopy(appStateItemValue);

    // Save to SSR
    this.saveToSsrState(
      this.stateKeys[appStateItemName],
      copyOfappStateItemValue
    );

    // Emit App State (It also saves copyOfappStateItemValue to cache)
    const newState = {
      ...this.utils.deepCopy(this.appState$.value),
      [appStateItemName]: copyOfappStateItemValue,
    };
    this.appState$.next(newState);

    return appStateItemValue;
  }

  /**
   * Exposes appState as observable, consumers can subscribe to it.
   * @date 6/8/2023 - 3:58:52 PM
   *
   * @public
   * @readonly
   * @type {Observable<AppState>}
   */
  public get appState(): Observable<AppState> {
    return this.appState$.asObservable();
  }

  /**
   * Serves Main navigation categories, either from cache | SSR | DB
   * @date 6/8/2023 - 3:57:51 PM
   *
   * @public
   * @async
   * @returns {Promise<Array<Category>>}
   */
  public async getMainNavItems(): Promise<Array<MenuItem>> {
    const menuItems = (await this.getAppStateItemValue(
      APP_STATE_KEYS.mainNavItems
    ).catch(this.catchFn)) as Array<MenuItem>;

    return menuItems;
  }
}
