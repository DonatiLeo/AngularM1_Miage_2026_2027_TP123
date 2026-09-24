import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../../shared/services/auth.service';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  readonly auth = inject(AuthService);
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  logout(): void {
    console.debug('[AppComponent] Déconnexion demandée');
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }
}
