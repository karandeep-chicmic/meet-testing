import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScreenShareComponent } from './components/main/screen-share/screen-share.component';
import { StartPageComponent } from './components/main/start-page/start-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ui';
}
