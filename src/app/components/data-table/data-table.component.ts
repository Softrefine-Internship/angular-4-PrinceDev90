import { Component, inject, ViewEncapsulation } from '@angular/core';
import { DataTableServiceService } from 'src/app/core/services/data-table-service.service';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent {
  userService = inject(DataTableServiceService);
  searchQuery: string = '';
  userDatas = this.userService.allUsers;
  filteredUser = [...this.userDatas()];
  isLoadingUser = this.userService.isLoading;

  ngOnInit() {
    this.userService.fetchUsers(); // trigger fetch
  }

  trackById(index: number, user: User) {
    return user.id;
  }

  // sortByColumn(columnName: string) {}

  searchData(): User[] {
    const search = this.searchQuery.toLowerCase();
    return this.filteredUser.filter(
      (user) =>
        user.id === Number(search) ||
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.username.toLowerCase().includes(search) ||
        user.gender.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search) ||
        user.phone.toString().includes(search)
    );
  }
}
