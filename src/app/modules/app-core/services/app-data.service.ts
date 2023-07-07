import { Injectable } from '@angular/core';
import { APP_STATE_KEYS } from '../constants/app-state.constants';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { MenuItem } from '@annuadvent/ngx-common-ui/menu';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor(private appConfigService: AppConfigService) { }

  public async getValue(stateName: string, params: any = null): Promise<any> {
    let value: any = null;

    switch (stateName) {
      case APP_STATE_KEYS.mainNavItems:
        value = await this.getMainNavItems();
        break;
      // case APP_STATE_KEYS.somestateKey:
      //   value = await this.getValueForSomeStateKey(params);
      //   break;
      default:
      // NOTE: Add one separate switch case for each AppState items, above
    }

    return value;
  }

  public async getMainNavItems(): Promise<Array<MenuItem>> {
    return this.appConfigService.config.mainMenuItems;
  }

  // This is the sample pattern to follow to get and serve data.
  // public async getValueForSomeStateKey(params: any) {
  //   if (!params) throw new Error('getValueForSomeStateKey() requires params: param1, param2.');
  //   const { param1, param2 } = params;

  //   const value = await this.someService.getData(param1, param2);

  //   return value;
  // }
}
