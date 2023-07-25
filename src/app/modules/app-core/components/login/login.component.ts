import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfig, AppConfigService } from '@annuadvent/ngx-core/app-config';
import { FireAuthService } from '@annuadvent/ngx-tools/fire-auth';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  error: any;
  loading: boolean = true;
  appConfig: AppConfig;
  qParamsSubscription: Subscription;
  authStateSubscription: Subscription;
  returnUrl: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fireAuthService: FireAuthService,
    private appConfigService: AppConfigService,
  ) {
    this.appConfig = this.appConfigService.config;

    this.qParamsSubscription = this.route.queryParams.subscribe((qParams) => {
      this.returnUrl = qParams['returnUrl'];
    });

    this.authStateSubscription = this.fireAuthService
      .authStateChanged()
      .subscribe((user) => {
        this.isLoggedIn = !!user;
        if (this.isLoggedIn) {
          this.router.navigate([this.returnUrl || '/']);
        }
      });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.fireAuthService.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.qParamsSubscription.unsubscribe();
    this.authStateSubscription.unsubscribe();
  }

  public onSuccess(loginInfo: any): void {
    // This has been handled in AuthStateChange
    // if (loginInfo?.user && loginInfo?.returnUrl) {
    //   this.router.navigate([loginInfo?.returnUrl])
    // } else {
    //   this.router.navigate([this.returnUrl || '/']);
    // }
  }

  public onError(error: any): void {
    this.error = error;
  }

  public onUiShown(): void {
    this.loading = false;
  }
}
