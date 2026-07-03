import { Injectable, signal } from '@angular/core';
import { Slide } from '../models/slide';

@Injectable({
  providedIn: 'root'
})
export class SlidePlayerService {

  private slides: Slide[] = [];

  private index = signal(0);

  private timer: any;

  currentIndex = this.index.asReadonly();

  setSlides(slides: Slide[]) {
    this.slides = slides;
  }

  start() {

    this.stop();

    this.timer = setInterval(() => {

      if (!this.slides.length) return;

      this.index.update(i => (i + 1) % this.slides.length);

    }, this.getCurrentDuration());

  }

  private getCurrentDuration(): number {

    const slide = this.slides[this.index()] as Slide;

    return slide?.duration ?? 5000;

  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  getCurrentSlide(): Slide | null {
    return this.slides[this.index()] ?? null;
  }

}