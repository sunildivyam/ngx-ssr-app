import { Component } from '@angular/core';
import {
  Sitemap,
  SitemapService,
  SitemapResponse,
  SitemapInfo,
  SitemapItem,
} from '@annuadvent/ngx-tools/fire-storage';
import { SpinnerMode } from '@annuadvent/ngx-common-ui/spinner';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { AppSitemapService } from '../../services/app-sitemap.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.scss']
})
export class SitemapComponent {
  sitemapInfo: SitemapInfo = null;
  sitemap: Sitemap = null;
  newSitemap: Sitemap = null;
  newUrls: Array<SitemapItem> = [];
  spinnerMode = SpinnerMode.Spinner;
  loading: boolean = false;
  errorMessage: string = '';
  errorCode: string = '';
  saveSuccess: boolean = false;

  constructor(
    private appSitemapSvc: AppSitemapService,
    private sitemapSvc: SitemapService,
    private utilsSvc: UtilsService) {

  }

  public loadSitemap(): void {
    this.loading = true;
    this.sitemapSvc.getSitemapResponse().then((sitemapRes: SitemapResponse) => {
      this.sitemapInfo = sitemapRes.sitemapInfo;
      this.sitemap = sitemapRes.sitemap;
      this.loading = false;
    });
  }

  public checkNewUrls(): void {
    this.loading = true;
    Promise.all([
      this.appSitemapSvc.generateCategoryUrls(this.sitemapInfo),
      this.appSitemapSvc.generateArticleUrls(this.sitemapInfo)
    ])
      .then(([catSitemapItems, artSitemapItems]) => {
        this.newUrls = [...catSitemapItems, ...artSitemapItems];
        this.loading = false;
      });
  }

  public previewSitemap(): void {
    this.newSitemap = this.sitemapSvc.addUrlsToSitemapJson(this.newUrls, this.sitemap);
  }


  /**
   * Saves the sitemap.xml and last updated json too.
   * Saving sitemap, fetches the latest sitemap, and new urls again, to keep them updated.
   * @date 2/28/2023 - 11:19:33 PM
   *
   * @public
   * @param {Sitemap} sitemap
   */
  public saveSitemap(sitemap: Sitemap): void {
    this.setError(null);
    this.saveSuccess = false;
    this.loading = true;

    // Step 1) Loads the existing sitemap
    this.sitemapSvc.getSitemapResponse().then((sitemapRes: SitemapResponse) => {
      this.sitemapInfo = sitemapRes.sitemapInfo;
      this.sitemap = sitemapRes.sitemap;

      // Step 2) Fetches the new Urls if available.
      Promise.all([
        this.appSitemapSvc.generateCategoryUrls(this.sitemapInfo),
        this.appSitemapSvc.generateArticleUrls(this.sitemapInfo)
      ])
        .then(([catSitemapItems, artSitemapItems]) => {
          this.newUrls = [...catSitemapItems, ...artSitemapItems];

          // Step 3) Merges the existing and new Urls
          this.newSitemap = this.sitemapSvc.addUrlsToSitemapJson(this.newUrls, this.sitemap);
          const clonedNewSitemap: Sitemap = this.utilsSvc.deepCopy(this.newSitemap);
          clonedNewSitemap.urlset.url.forEach(url => {
            delete url.status;
          });

          // Step 4) Saves the newSitemap
          this.sitemapSvc.saveSitemap(clonedNewSitemap).then((result) => {
            // Mark Successfull
            this.sitemapInfo = null;
            this.sitemap = null;
            this.newSitemap = null;
            this.newUrls = [];
            this.loading = false;
            this.saveSuccess = true;
          }).catch(error => this.setError(error));
        }).catch(error => this.setError(error));
    }).catch(error => this.setError(error));
  }

  private setError(error: any): void {
    this.errorCode = error?.code || error?.status || '';
    this.errorMessage = error?.message || error?.statusText || '';
    this.loading = false;
  }

  public saveSuccessClosed(): void {
    this.saveSuccess = false;
  }
}
