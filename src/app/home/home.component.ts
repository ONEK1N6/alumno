import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent,RouterModule,CardModule,ToolbarModule,ButtonModule,SplitButtonModule,InputTextModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh'
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ];
}
}
