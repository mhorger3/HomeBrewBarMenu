import { Injectable, signal } from '@angular/core';
import { Beer } from '../models/beer';
import { BeerSection } from '../models/beer-section';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

    private readonly PAGE_SIZE = 3;

  groupAndPaginate(beers: Beer[]): BeerSection[] {

    const groups: Record<string, Beer[]> = {};

    for (const beer of beers) {

      const category = this.getCategory(beer);

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(beer);

    }

    return Object.keys(groups).map(title => {

    const list = groups[title]
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

    return {
        title,
        pages: this.paginate(list, this.PAGE_SIZE)
    };

    });

  }

  private paginate(list: Beer[], size: number): Beer[][] {

    const pages: Beer[][] = [];

    for (let i = 0; i < list.length; i += size) {
      pages.push(list.slice(i, i + size));
    }

    return pages;

  }


  private getCategory(beer: Beer): string {
    const s = beer.style.toLowerCase();
    if (s.includes('stout') || s.includes('porter')) return 'Stouts / Porters';
    if (s.includes('sour')) return 'Sours';
    if (s.includes('farmhouse') || s.includes('saison') || s.includes('wild')) return 'Wild / Farmhouses';
    if (s.includes('lager') || s.includes('pils') || s.includes('wheat') || s.includes('shandy')) return 'Lagers, Pils, Wheat';
    if (s.includes('cider') || s.includes('seltzer')) return 'Ciders / Selzters';
    if (s.includes('quad') || s.includes('ale') || s.includes('tripel') || s.includes('ipa')) return 'Pale / Strong Ales';
    return 'Other';
  }
}