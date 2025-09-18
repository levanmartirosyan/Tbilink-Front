import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzConfigService } from 'ng-zorro-antd/core/config';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzButtonModule, NzDropDownModule, NzIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isDark = false;

  constructor() {
    this.isDark = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    document.body.classList.toggle('dark-theme', this.isDark);
    document.body.classList.toggle('light-theme', !this.isDark);
  }
}
