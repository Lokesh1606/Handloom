import { Component } from '@angular/core';
import { HeaderComponent } from "./header-component/header-component";
import { FooterComponent } from "./footer-component/footer-component";
import { MainComponent } from "./main-component/main-component";

@Component({
  selector: 'app-dashboard.component',
  imports: [HeaderComponent, MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

}
