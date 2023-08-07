import { Component, OnInit } from '@angular/core';
import { MenuItem } from '@annuadvent/ngx-common-ui/menu';
import { SpinnerMode } from '@annuadvent/ngx-common-ui/spinner';
import { ThemeService } from '@annuadvent/ngx-common-ui/theme';
import { AppSpinnerService } from '../../modules/app-core/services/app-spinner.service';
import { AppStateService } from '../../modules/app-core/services/app-state.service';
import { AppState } from '../../modules/app-core/interfaces/app-state.interface';
import { AppConfigService, AppConfig } from '@annuadvent/ngx-core/app-config';
import { SOCIAL_MEDIA_BUTTONS, SocialMediaButton } from '@annuadvent/ngx-common-ui/social-media';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  appConfig: AppConfig;
  mainMenuItems: Array<MenuItem> = [];
  footerNavItems: Array<MenuItem> = [];
  isMainNavOpen: boolean = false;
  SpinnerMode = SpinnerMode;
  themeFontSizes: Array<string> = ['12px', '16px', '20px'];
  socialMediaButtons: Array<SocialMediaButton> = [];

  constructor(
    private themeService: ThemeService,
    public appSpinner: AppSpinnerService,
    private appStateService: AppStateService,
    private appConfigService: AppConfigService,
  ) {
    this.appConfig = this.appConfigService.config;

    this.appStateService.appState.subscribe((appState: AppState) => {
      this.mainMenuItems = appState.mainNavItems as Array<MenuItem>;
      this.footerNavItems = appState.mainNavItems as Array<MenuItem>;
    });

    // init social media
    this.initSocialMedia();
  }

  async ngOnInit(): Promise<void> {
    this.themeService.setTheme(this.appConfig.themeName, true);
  }

  public loginStatusClicked(): void {
    this.isMainNavOpen = !this.isMainNavOpen;
  }

  public mainMenuOpenStatusChanged(opened: boolean): void {
    this.isMainNavOpen = opened;
  }

  public initSocialMedia(): void {
    const socialMeidaConfig = this.appConfigService.config.socialMedia || {};

    this.socialMediaButtons = SOCIAL_MEDIA_BUTTONS.map(btn => {
      return {
        ...btn,
        url: socialMeidaConfig[btn.id]
      }
    });
  }
}
