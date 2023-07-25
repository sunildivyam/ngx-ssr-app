import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {
  FireAuthService,
  FIREBASE_AUTH_ROLES,
} from '@annuadvent/ngx-tools/fire-auth';
import { MetaInfo, MetaService } from '@annuadvent/ngx-common-ui/meta';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private dashboardMetaInfo: MetaInfo;
  isAuthor: boolean = false;
  isAdmin: boolean = false;
  routeEndEvent: Subscription;

  constructor(
    public fireAuthService: FireAuthService,
    private metaService: MetaService,
    private appConfigService: AppConfigService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.dashboardMetaInfo = this.appConfigService.config.dashboard.dashboardMetaInfo;

    this.routeEndEvent = this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.route.firstChild) {
          this.metaService.setPageMeta({
            ...this.dashboardMetaInfo,
            title: `${this.appConfigService.config.metaInfo.title} - ${this.dashboardMetaInfo.title}`,
          });
        }
      });
  }

  ngOnInit(): void {
    this.isAuthorFn();
    this.isAdminFn();
    this.metaService.setPageMeta({
      ...this.dashboardMetaInfo,
      title: `${this.appConfigService.config.metaInfo.title} - ${this.dashboardMetaInfo.title}`,
    });
  }

  public async isAuthorFn(): Promise<boolean> {
    this.isAuthor = await this.fireAuthService.currentUserHasRole(
      FIREBASE_AUTH_ROLES.AUTHOR
    );

    return this.isAuthor;
  }

  public async isAdminFn(): Promise<boolean> {
    this.isAdmin = await this.fireAuthService.currentUserHasRole(
      FIREBASE_AUTH_ROLES.ADMIN
    );

    return this.isAdmin;
  }

  ngOnDestroy(): void {
    this.routeEndEvent.unsubscribe();
  }

  public onOutletActivated(): void { }

}
