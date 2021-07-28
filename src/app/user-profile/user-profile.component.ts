import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// API Call
import {
  GetUserService,
  GetAllMoviesService,
  DeleteMovieFavoritesService,
} from '../fetch-api-data.service';

// Import Angular Material
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Import components
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';
import { UserPasswordEditComponent } from '../user-password-edit/user-password-edit.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  movies: any = [];
  user: any = {};
  favoriteMovies: any = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: GetUserService,
    public fetchApiData3: DeleteMovieFavoritesService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  // Open dialog box to update user account details
  openUserProfileEditDialog(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '300px',
      data: {
        onSuccess: () => this.getUser(),
      },
    });
  }

  // Open dialog to update password
  openUserPasswordEditDialog(): void {
    this.dialog.open(UserPasswordEditComponent, {
      width: '300px',
    });
  }

  // Open dialog to delete user account
  openUserProfileDeleteDialog(): void {
    this.dialog.open(UserProfileDeleteComponent, {
      width: '300px',
    });
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData2.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      this.getMovies();
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
    this.filterFavorites();
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favoriteMovies.push(movie);
      }
    });
    return this.favoriteMovies;
  }

  deleteMovieFavorites(id: string, title: string): void {
    this.fetchApiData3.deleteMovieFavorites(id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed from your favorites`,
        'OK',
        {
          duration: 1000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }
}
