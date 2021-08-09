import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss'],
})
export class MovieSynopsisComponent {
  /** Injects details data from single movie-card object for use in movie-synopsis component
   * @params data - string of objects
   * @params Title
   * @params Description
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    },
    public dialogRef: MatDialogRef<MovieSynopsisComponent>,
    public snackBar: MatSnackBar
  ) {}
}
