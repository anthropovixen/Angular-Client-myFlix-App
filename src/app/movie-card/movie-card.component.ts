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
      console.log(response);
      return this.movies;
    });
  }

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

  openDirectionDialog(Name: string, Bio: string): void {
    this.dialog.open(MovieDirectionComponent, {
      data: { Name, Bio },
      width: '350px',
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: { Name, Description },
      width: '350px',
    });
  }

  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, Description },
      width: '350px',
    });
  }
}
