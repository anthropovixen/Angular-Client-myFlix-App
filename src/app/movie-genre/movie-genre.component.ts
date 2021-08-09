import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss'],
})
export class MovieGenreComponent {
  /** Injects genre data from single movie-card object for use in movie-genre component
   * @params data - string of objects
   * @params Name
   * @params Description
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Description: string;
    },
    public dialogRef: MatDialogRef<MovieGenreComponent>,
    public snackBar: MatSnackBar
  ) {}
}
