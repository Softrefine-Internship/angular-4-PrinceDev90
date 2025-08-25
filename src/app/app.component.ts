import { Component, inject, OnInit } from '@angular/core';
import { DataTableServiceService } from './core/services/data-table-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userService = inject(DataTableServiceService);

  async ngOnInit() {
    await this.userService.fetchUsers();
  }
}
