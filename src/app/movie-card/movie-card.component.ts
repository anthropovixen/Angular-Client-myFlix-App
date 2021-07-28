import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  getUserFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData2.getUser().subscribe((response: any) => {
        this.favoriteMovies = response.favoriteMovies;
        console.log(this.favoriteMovies);
        return this.favoriteMovies;
      });
    }
  }

  addFavoriteMovie(id: string): void {
    this.fetchApiData3.addFavoriteMovie(id).subscribe((response: any) => {
      console.log(response);
      this.getUserFavoriteMovies();
    });
  }

  deleteMovieFavorites(id: string): void {
    this.fetchApiData4.deleteMovieFavorites(id).subscribe((response: any) => {
      console.log(response);
      this.getUserFavoriteMovies();
    });
  }
}
