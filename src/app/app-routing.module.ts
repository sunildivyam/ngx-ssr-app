import { NgModule, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router, RouterModule } from '@angular/router';
import { routes } from './constants/app-routes.constants';
import { Subscription, filter } from 'rxjs';
import { AppSpinnerService } from './modules/app-core';


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledNonBlocking',    // this is needed to run APP_INITIALIZER before route resolvers
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnDestroy {
  navStartSubscription: Subscription;
  navEndSubscription: Subscription;
  navErrorSubscription: Subscription;

  constructor(
    private router: Router,
    private appSpinner: AppSpinnerService,
  ) {
    // Nav Start
    this.navStartSubscription = this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(() => {
      this.appSpinner.start();
    });


    // Nav End
    this.navEndSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.appSpinner.stop();
    });

    // Nav Error
    this.navErrorSubscription = this.router.events.pipe(filter(event => event instanceof NavigationError)).subscribe((navErrorEvent) => {
      this.appSpinner.stop();
    });
  }

  ngOnDestroy(): void {
    this.navEndSubscription && this.navEndSubscription.unsubscribe();
    this.navErrorSubscription && this.navErrorSubscription.unsubscribe();
    this.navStartSubscription && this.navStartSubscription.unsubscribe();
  }
}
