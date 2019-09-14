import { Component, Input } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input() dataset: User[] = [];
  @Input() showDeleteButton = true;
  @Input() showEditButton = true;
  @Input() showFavoriteButton = true;

  _favorites: number[] = [];
  _showModal = false;
  _deleteIdUser: number;

  constructor() { }

  showDeleteModal(id: number) {
    this._showModal = true;
    this._deleteIdUser = id;
  }

  addFavorites(id: number) {
    if (!this._favorites.includes(id)) {
      this._favorites.push(id);
    } else {
      this._favorites = this._favorites.filter(data => data !== id);
    }
  }

  isFavorite(id: number) {
    return this._favorites.includes(id);
  }

  confirmDeleteModal() {
    this.dataset = this.dataset.filter( item => {
      return item.id !== this._deleteIdUser;
    });

    this._showModal = false;
  }

}
