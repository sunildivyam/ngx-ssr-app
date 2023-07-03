import { StateKey } from '@angular/core';
import { MenuItem } from '@annuadvent/ngx-common-ui/menu';

/*
  Stores Application state
*/
export interface AppState {
  mainNavItems?: Array<MenuItem> | AppStateValue;
}

/**
 * SSR Transfer State keys
 */
export interface StateKeys {
  [index: string]: StateKey<AppStateValue>;
}

// This allows to
export type AppStateValue =
  string | number | boolean | Array<MenuItem>
