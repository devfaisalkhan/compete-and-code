import { Component } from '@angular/core';
import { ContentWrapperComponent } from '../components/content-wrapper/content-wrapper.component';
import { MainFooterComponent } from '../components/main-footer/main-footer.component';
import { MainNavbarComponent } from '../components/main-navbar/main-navbar.component';
import { MainSidebarComponent } from '../components/main-sidebar/main-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, ContentWrapperComponent, MainSidebarComponent, MainNavbarComponent, MainFooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  users = 0;

  constructor(private authSvc: AuthService) {
    
  }

  ngOnInit() {
    this.getAllUsersCount();
  }

  getAllUsersCount() {
    this.authSvc.getAllUsersCount().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
      }
    });
  }
}
