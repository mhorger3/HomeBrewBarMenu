import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slide } from '../models/slide';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  private http = inject(HttpClient);

  getSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>('assets/beers.json');
  }
}