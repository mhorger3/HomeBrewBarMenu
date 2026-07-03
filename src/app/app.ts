import { Component } from '@angular/core';
import { Display } from './components/display/display';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Display
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}