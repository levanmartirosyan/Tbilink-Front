import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 },
  theme: {
    primaryColor: '#1890ff',
  },
};

const icons = [AllIcons.SunOutline, AllIcons.MoonOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideNzConfig(ngZorroConfig),
    provideNzIcons(icons),
  ],
};
