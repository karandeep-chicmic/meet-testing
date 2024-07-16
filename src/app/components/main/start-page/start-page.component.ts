import { Component, inject } from '@angular/core';
import { ScreenShareComponent } from '../screen-share/screen-share.component';
import { Router } from '@angular/router';

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
    this.router.navigate(['/screen-share']);
    console.log('submit');
  }
}
