import { Routes } from '@angular/router';
import { StartPageComponent } from './components/main/start-page/start-page.component';
import { ScreenShareComponent } from './components/main/screen-share/screen-share.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: StartPageComponent,
  },
  {
    path: 'screen-share',
    component: ScreenShareComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
