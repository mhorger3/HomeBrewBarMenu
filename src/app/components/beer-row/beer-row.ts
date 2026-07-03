import { Component, input } from '@angular/core';
import { Beer } from '../../models/beer';

@Component({
  selector: 'app-beer-row',
  standalone: true,
  templateUrl: './beer-row.html',
  styleUrl: './beer-row.css'
})
export class BeerRow {
  beer = input.required<Beer>();
}