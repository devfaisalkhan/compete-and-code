import { Component } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  private previousUrl: string | null = null;

  constructor(private router: Router) {
    // Subscribe to router events to track the previous URL
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.previousUrl = event.url;
      }
    });
  }

  goBack(): void {
    if (this.previousUrl) {
      this.router.navigate([this.previousUrl]);
    } else {
      // If no previous URL exists, go to the home page
      this.router.navigate(['/']);
    }
  }
}
