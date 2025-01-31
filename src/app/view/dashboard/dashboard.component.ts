import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchComponent, WidgetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
