import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { SlideService } from '../../services/slide.service';
import { SlidePlayerService } from '../../services/slide-player.service';
import { LayoutService } from '../../services/layout.service';

import { BeerRow } from '../beer-row/beer-row';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule, BeerRow],
  templateUrl: './display.html',
  styleUrl: './display.css'
})
export class Display {

  private slideService = inject(SlideService);
  private player = inject(SlidePlayerService);
  layout = inject(LayoutService);
  transitioning = this.layout.transitioning;
  slides = toSignal(this.slideService.getSlides(), { initialValue: [] });
  sectionPageIndex: Record<string, number> = {};
  currentSlide = computed(() => {

    const slides = this.slides();
    if (!slides.length) return null;

    return slides[this.player.currentIndex()];
  });

  sections = computed(() => {

  const slide = this.currentSlide();

  if (!slide || slide.type !== 'beer') return [];

  return this.layout.groupAndPaginate(slide.data);

  });

  startPageRotation(sections: any[]) {

  for (const s of sections) {
    this.sectionPageIndex[s.title] = 0;
  }

  setInterval(() => {

    for (const s of sections) {

      const pages = s.pages.length;

      this.sectionPageIndex[s.title] =
        (this.sectionPageIndex[s.title] + 1) % pages;

    }

  }, 8000); // slower than slide rotation

}

 constructor() {

  this.slideService.getSlides().subscribe(slides => {

    this.player.setSlides(slides);
    this.player.start();

    const beerSlide = slides.find(s => s.type === 'beer');

    if (beerSlide) {
      const grouped = this.layout.groupAndPaginate(beerSlide.data);

      this.layout.startPagination(grouped.map(g => g.title));
    }

  });

  }
}