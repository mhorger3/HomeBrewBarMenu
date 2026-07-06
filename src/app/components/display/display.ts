import {
  Component,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerRow } from '../beer-row/beer-row';

import { SlideService } from '../../services/slide.service';
import { LayoutService } from '../../services/layout.service';
import { BeerSection } from '../../models/beer-section';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [
    CommonModule,
    BeerRow
  ],
  templateUrl: './display.html',
  styleUrl: './display.css'
})
export class Display implements OnInit {

  private slideService = inject(SlideService);
  private layout = inject(LayoutService);

  // All grouped/paginated beer sections
  readonly sections = signal<BeerSection[]>([]);

  // Current page for each category
  readonly pageIndex = signal<Record<string, number>>({});

  // Used for CSS transitions
  readonly transitioning = signal(false);

  ngOnInit(): void {

    this.slideService.getSlides().subscribe(slides => {

      const beerSlide = slides.find(s => s.type === 'beer');

      if (!beerSlide) {
        return;
      }

      const grouped = this.layout.groupAndPaginate(beerSlide.data);

      this.sections.set(grouped);

      // Initialize every category to page 0
      const indexes: Record<string, number> = {};

      grouped.forEach(section => {
        indexes[section.title] = 0;
      });

      this.pageIndex.set(indexes);

      this.startPagination();

    });

  }

  private startPagination(): void {

    setInterval(() => {

      this.transitioning.set(true);

      setTimeout(() => {

        this.pageIndex.update(current => {

          const next = { ...current };

          for (const section of this.sections()) {

            next[section.title] =
              ((next[section.title] ?? 0) + 1) %
              section.pages.length;

          }

          return next;

        });

        this.transitioning.set(false);

      }, 350);

    }, 8000);

  }

}