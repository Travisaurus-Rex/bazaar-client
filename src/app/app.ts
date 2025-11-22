import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavHeaderComponent } from "./shared/components/nav-component/nav-header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bazaar');
}
