import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieDirectionComponent } from '../movie-direction/movie-direction.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

import {
  GetAllMoviesService,
  GetUserService,
  AddFavoriteMovieService,
  DeleteMovieFavoritesService,
} from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData2: GetUserService,
    public fetchApiData3: AddFavoriteMovieService,
    public fetchApiData4: DeleteMovieFavoritesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavoriteMovies();
  }

  /** Function fetches movie data from database
   * @returns movies - array of movie objects
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(response);
      return this.movies;
    });
  }

  /** Function fetches user's favorite movies from user account on database
   * @returns favoriteMovies - array of movie IDs
   */

  getUserFavoriteMovies(): void {
    const userName = localStorage.getItem('userName');
    if (userName) {
      this.fetchApiData2.getUser().subscribe((response: any) => {
        this.favoriteMovies = response.FavoriteMovies;
        // console.log(this.favoriteMovies);
        return this.favoriteMovies;
      });
    }
  }

  /** Function adds movie ID to user's favorite movies list - FavoriteMovies
   * @params id - movie ID
   */

  addFavoriteMovie(_id: string): void {
    this.fetchApiData3.addFavoriteMovie(_id).subscribe((response: any) => {
      console.log(response);
      this.getUserFavoriteMovies();
    });
  }

  /** Function deletes movie ID from FavoriteMovies array in user account on database */
  deleteMovieFavorites(_id: string): void {
    this.fetchApiData4.deleteMovieFavorites(_id).subscribe((response: any) => {
      console.log(response);
      this.getUserFavoriteMovies();
    });
  }

  /**Function opens dialog to display direction's data
   * @params Name
   * @params Bio
   */
  openDirectionDialog(Name: string, Bio: string): void {
    this.dialog.open(MovieDirectionComponent, {
      data: { Name, Bio },
      width: '350px',
    });
  }

  /**Function opens dialog to display movie's genre data
   * @params Name
   * @params Description
   */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '350px',
    });
  }

  /** Function opens dialog to display movie's synopsis
   * @params Title
   * @params Descriptionß
   */
  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, Description },
      width: '350px',
    });
  }
}
