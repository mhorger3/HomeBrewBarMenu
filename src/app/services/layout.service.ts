import { Injectable, signal } from '@angular/core';
import { Beer } from '../models/beer';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private PAGE_SIZE = 6;

  private pageIndex = signal<Record<string, number>>({});
  transitioning = signal(false);
  getPageIndex() {
    return this.pageIndex.asReadonly();
  }

  groupAndPaginate(beers: Beer[]) {

    const groups: Record<string, Beer[]> = {};

    for (const beer of beers) {
      const category = this.getCategory(beer);

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(beer);
    }

    return Object.keys(groups).map(title => {

      const list = groups[title];

      return {
        title,
        pages: this.paginate(list, this.PAGE_SIZE)
      };

    });
  }

  paginate(list: Beer[], size: number): Beer[][] {
    const pages: Beer[][] = [];

    for (let i = 0; i < list.length; i += size) {
      pages.push(list.slice(i, i + size));
    }

    return pages;
  }

  startPagination(titles: string[], interval = 8000) {

  const initial: Record<string, number> = {};

  for (const t of titles) {
    initial[t] = 0;
  }

  this.pageIndex.set(initial);

  setInterval(() => {

    this.transitioning.set(true);

    setTimeout(() => {

      this.pageIndex.update(state => {

        const next = { ...state };

        for (const t of titles) {
          next[t] = (next[t] ?? 0) + 1;
        }

        return next;

      });

      this.transitioning.set(false);

    }, 400); // transition window

  }, interval);

    }

  private getCategory(beer: Beer): string {
    const s = beer.style.toLowerCase();
    if (s.includes('stout')) return 'Stouts';
    if (s.includes('sour')) return 'Sours';
    if (s.includes('farmhouse') || s.includes('saison') || s.includes('wild')) return 'Wild Ales';
    if (s.includes('ipa')) return 'IPAs';
    if (s.includes('porter')) return 'Porters';
    if (s.includes('lager')) return 'Lagers';
    if (s.includes('pils')) return 'Pilsners';
    if (s.includes('wheat')) return 'Wheat';
    if (s.includes('cider')) return 'Ciders';
    if (s.includes('seltzer')) return 'Selzters';
    if (s.includes('quad') || s.includes('ale') || s.includes('tripel')) return 'Dark Ales';
    return 'Other';
  }
}