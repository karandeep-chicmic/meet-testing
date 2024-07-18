import { Routes } from '@angular/router';
import { StartPageComponent } from './components/main/start-page/start-page.component';
import { ScreenShareComponent } from './components/main/screen-share/screen-share.component';
import { UI_ROUTES } from '../constants';
import { VideoCallComponent } from './components/main/video-call/video-call.component';

export const routes: Routes = [
  {
    path: UI_ROUTES.HOME,
    redirectTo: UI_ROUTES.START,
    pathMatch: 'full',
  },
  {
    path: UI_ROUTES.START,
    component: StartPageComponent,
  },
  {
    path: UI_ROUTES.SCREEN_SHARE,
    component: ScreenShareComponent,
  },
  {
    path: UI_ROUTES.VIDEO_CALL,
    component: VideoCallComponent,
  },
  {
    path: UI_ROUTES.WILDCARD_ROUTE,
    redirectTo: UI_ROUTES.HOME,
    pathMatch: 'full',
  },
];
