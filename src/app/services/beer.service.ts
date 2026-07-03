import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beer } from '../models/beer';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private http = inject(HttpClient);

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>('assets/beers.json');
  }
}