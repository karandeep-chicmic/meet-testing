import { Component, inject } from '@angular/core';
import { ScreenShareComponent } from '../screen-share/screen-share.component';
import { Router } from '@angular/router';
import { UI_ROUTES } from '../../../../constants';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [ScreenShareComponent],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css',
})
export class StartPageComponent {
  router: Router = inject(Router);

  onSubmit() {
    this.router.navigate([UI_ROUTES.SCREEN_SHARE]);
    console.log('submit');
  }

  onSubmit2() {
    this.router.navigate([UI_ROUTES.VIDEO_CALL]);
  }
}
