import { Injectable } from '@angular/core';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { Article, FireArticlesHttpService, FireCategoriesHttpService } from '@annuadvent/ngx-tools/fire-cms';
import { SitemapInfo, SitemapItem } from '@annuadvent/ngx-tools/fire-storage';

@Injectable({
  providedIn: 'root'
})
export class AppSitemapService {
  private apiBaseUrl: string = '';

  constructor(
    private fireCategoriesHttpService: FireCategoriesHttpService,
    private fireArticlesHttpService: FireArticlesHttpService,
    private appConfigService: AppConfigService,
  ) {
    this.apiBaseUrl = this.appConfigService.config.apiBaseUrl;
  }

  public async generateCategoryUrls(sitemapInfo: SitemapInfo): Promise<Array<SitemapItem>> {
    let sitemapItems: Array<SitemapItem> = [];
    const categories = await this.fireCategoriesHttpService.getAllLiveCategoriesFromDate(sitemapInfo.updated)
      .catch(error => {
        return [];
      });
    sitemapItems = categories.map(cat => {
      return {
        loc: {
          _text: `${this.apiBaseUrl}/${cat.id}`
        },
        lastmod: {
          _text: cat.updated
        },
        priority: {
          _text: '1.00'
        }
      } as SitemapItem;
    }) || [];

    return sitemapItems;
  }

  public async generateArticleUrls(sitemapInfo: SitemapInfo): Promise<Array<SitemapItem>> {
    let sitemapItems: Array<SitemapItem> = [];
    const articles = await this.fireArticlesHttpService.getAllLiveArticlesFromDate(sitemapInfo.updated)
      .catch(error => {
        return [];
      });
    articles.forEach((article: Article) => {
      article.categories.forEach(catId => {
        sitemapItems.push({
          loc: {
            _text: `${this.apiBaseUrl}/${catId}/${article.id}`
          },
          lastmod: {
            _text: article.updated
          },
          priority: {
            _text: '0.80'
          }
        } as SitemapItem)
      })
    });

    return sitemapItems;
  }
}
