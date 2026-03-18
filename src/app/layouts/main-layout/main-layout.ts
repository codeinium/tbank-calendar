import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../widgets/header/header';

@Component({
  selector: 'main-layout',
  imports: [ RouterOutlet, HeaderComponent ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayoutComponent {
}
