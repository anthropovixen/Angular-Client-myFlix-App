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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  movies: any = [];
  userName: any = {};
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
    this.getMovies();
  }

  /** Function opens dialog box to update user account details
   */
  openUserProfileEditDialog(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '300px',
      data: {
        onSuccess: () => this.getUser(),
      },
    });
  }

  /** Function opens dialog to delete user account */
  openUserProfileDeleteDialog(): void {
    this.dialog.open(UserProfileDeleteComponent, {
      width: '300px',
    });
  }

  /** Function fetches movie data to populate movie-card component with all movies from database
   * @returns {array} movies - array of movie objects
   * calls getUser function
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
    this.getUser();
  }

  /**Function fetches user account details from database to populate user profile information
   * Matches user's FavoriteMovies array of movie IDs with movie IDs in movies array, and
   * populates favoriteMovies array with movie data to display in browser
   * @returns userName - user account details
   * @returns favoriteMovies - array of movie objects with user's favorite movies
   */
  getUser(): void {
    const userName = localStorage.getItem('userName');
    this.fetchApiData2.getUser().subscribe((response: any) => {
      this.userName = response;
      this.favoriteMovies = this.movies.filter((movie: any) =>
        this.userName.FavoriteMovies.includes(movie._id)
      );
      console.log(this.userName);
      console.log(this.favoriteMovies);
      return this.userName, this.favoriteMovies;
    });
  }

  /** Function deletes movie ID from user's favorite movies list on database
   * @params id - movie ID
   * @params title - movie Title
   */
  deleteMovieFavorites(id: string, title: string): void {
    this.fetchApiData3.deleteMovieFavorites(id).subscribe((response: any) => {
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
