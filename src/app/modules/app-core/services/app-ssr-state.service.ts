import {
  Inject,
  Injectable,
  PLATFORM_ID,
  TransferState,
  makeStateKey,
} from '@angular/core';
import {
  isPlatformBrowser,
  isPlatformServer,
} from '@angular/common';
import { UtilsService } from '@annuadvent/ngx-core/utils';

@Injectable({
  providedIn: 'root',
})
export class AppSsrStateService {


  constructor(
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: string,
    private utilsService: UtilsService,
  ) { }

  public removeValue(key: string): void {
    const ssrKey = makeStateKey<any>(key);
    if (isPlatformBrowser(this.platformId)) {
      this.transferState.remove(ssrKey);
    }
  }

  public getValue(key: string): any {
    const ssrKey = makeStateKey<any>(key);
    if (this.transferState.hasKey(ssrKey)) {
      const value = this.utilsService.deepCopy(this.transferState.get(ssrKey, null));
      this.removeValue(key);

      return value;
    }

  }

  public setValue(key: string, value: any): void {
    const ssrKey = makeStateKey<any>(key);
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(ssrKey, value);
    }
  }
}
