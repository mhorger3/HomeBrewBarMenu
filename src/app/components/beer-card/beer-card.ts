import {
  Component,
  input
} from '@angular/core';

import { Beer } from '../../models/beer';

@Component({
  selector: 'app-beer-card',
  standalone: true,
  templateUrl: './beer-card.html',
  styleUrl: './beer-card.css'
})

export class BeerCard {

  beer = input.required<Beer>();

}