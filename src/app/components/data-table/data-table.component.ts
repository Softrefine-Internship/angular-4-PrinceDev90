import {
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DataTableServiceService } from 'src/app/core/services/data-table-service.service';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent {
  private userService = inject(DataTableServiceService);
  users = signal<User[]>([]); // all users
  isLoadingUser = this.userService.isLoading;

  sortColumn = signal<keyof User | null>(null);

  sortDirection = signal<'asc' | 'desc'>('asc');

  selectedSort = signal<keyof User | ''>('');

  searchQuery = signal<string>('');

  private searchQueryDebounce = signal<string>('');

  constructor() {
    let timeout: ReturnType<typeof setTimeout>;

    effect(() => {
      clearTimeout(timeout);
      const q = this.searchQuery();
      timeout = setTimeout(() => this.searchQueryDebounce.set(q), 300);
    });
  }

  async ngOnInit() {
    const data = await this.userService.fetchUsers();
    this.users.set(data);
  }

  filteredUsers = computed(() => {
    const query = this.searchQueryDebounce().trim().toLowerCase();
    let result = this.users();

    // filtering
    if (query) {
      result = this.users().filter(
        (user) =>
          user.id === Number(query) ||
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.gender.toLowerCase().includes(query) ||
          user.phone.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query) ||
          user.age === Number(query)
      );
    }

    // sorting
    const column = this.sortColumn();
    const direction = this.sortDirection();

    if (column) {
      result = [...result].sort((a, b) => {
        console.log('A: ', a); // gives whole object of next line
        console.log('B: ', b); // gives whole object of prev line

        const valA = a[column];
        const valB = b[column];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return direction === 'asc' ? valA - valB : valB - valA;
        } else {
          const strA = valA.toString().toLowerCase();
          const strB = valB.toString().toLowerCase();
          if (strA < strB) return direction === 'asc' ? -1 : 1;
          if (strA > strB) return direction === 'asc' ? 1 : -1;
          return 0;
        }
      });
    }

    return result;
  });

  toggleSort(column: keyof User) {
    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
  }

  onSortChange(column: keyof User) {
    if (!column) return;

    if (this.sortColumn() === column) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortColumn.set(column);
      this.sortDirection.set('asc');
    }
    this.selectedSort.set(column);
  }
}
