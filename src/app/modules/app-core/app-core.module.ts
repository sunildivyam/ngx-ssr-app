import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login';
import { ContactUsComponent } from './components/contact-us';

import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { FireAuthModule } from '@annuadvent/ngx-tools/fire-auth';
import { ModalModule } from '@annuadvent/ngx-common-ui/modal';
import { FireStorageModule } from '@annuadvent/ngx-tools/fire-storage';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { UtilsModule } from '@annuadvent/ngx-core/utils';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { FireCommonModule } from '@annuadvent/ngx-tools/fire-common';


@NgModule({
  declarations: [LoginComponent, ContactUsComponent, SitemapComponent],
  imports: [
    CommonModule,
    CardModule,
    ErrorModule,
    FireAuthModule,
    SpinnerModule,
    ModalModule,
    FireStorageModule,
    UtilsModule,
    FireCommonModule,
  ],
  exports: [LoginComponent, ContactUsComponent, SitemapComponent],
})
export class AppCoreModule { }
