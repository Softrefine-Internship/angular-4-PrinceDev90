import { Component, inject, OnInit } from '@angular/core';
import { DataTableServiceService } from './core/services/data-table-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userService = inject(DataTableServiceService);
  isLoading: boolean = true;

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.userService.allUsers());

    await this.userService.fetchUsers();
    this.isLoading = false;
    console.log(this.userService.allUsers());
  }

  async onFetchData() {
    //   console.log(
    //     await this.userService.fetchUsers('https://dummyjson.com/users')
    //   );
    //   // console.log(this.userService);
  }
}
