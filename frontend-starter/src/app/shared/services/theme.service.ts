import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'gpc_theme';

  readonly isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const dark = this.isDarkMode();
      if (typeof document !== 'undefined') {
        document.body.classList.toggle('dark-theme', dark);
        localStorage.setItem(this.storageKey, dark ? 'dark' : 'light');
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update((dark) => !dark);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);
  }

  private getInitialTheme(): boolean {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        return saved === 'dark';
      }
    }
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  }
}
