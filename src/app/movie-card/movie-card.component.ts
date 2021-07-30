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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDirectionDialog(name: string, bio: string): void {
    this.dialog.open(MovieDirectionComponent, {
      data: { name, bio },
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { name, description },
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { description },
    });
  }

  getUserFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData2.getUser(user).subscribe((response: any) => {
        this.favoriteMovies = response.favoriteMovies;
        console.log(this.favoriteMovies);
        return this.favoriteMovies;
      });
    }
  }

  addFavoriteMovie(_id: string): void {
    this.fetchApiData3.addFavoriteMovie(_id).subscribe((response: any) => {
      console.log(response);
      this.getUserFavoriteMovies();
    });
  }

  deleteMovieFavorites(_id: string): void {
    this.fetchApiData4.deleteMovieFavorites(_id).subscribe((response: any) => {
      console.log(response);
      this.getUserFavoriteMovies();
    });
  }
}
