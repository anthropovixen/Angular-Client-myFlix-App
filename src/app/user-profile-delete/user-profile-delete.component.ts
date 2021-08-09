import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

import { DeleteUserProfileService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-delete',
  templateUrl: './user-profile-delete.component.html',
  styleUrls: ['./user-profile-delete.component.scss'],
})
export class UserProfileDeleteComponent implements OnInit {
  constructor(
    public fetchApiData: DeleteUserProfileService,
    public dialogRef: MatDialogRef<UserProfileDeleteComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /** Function deletes user account from database */

  deleteUserProfile(): void {
    this.fetchApiData.deleteUserProfile().subscribe(
      () => {
        this.dialogRef.close(); //closes dialog box after deletion of account
        localStorage.clear();
        this.snackBar.open(
          'So sad to see you go. Your account has been deleted.',
          'OK',
          {
            duration: 2000,
          }
        );
        this.router.navigate(['welcome']).then(() => {
          // redirects app to welcome page after account deletion
          window.location.reload();
        });
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /** Function cancels account deletion and reloads profile page */

  cancel(): void {
    this.router.navigate(['/profile']).then(() => {
      window.location.reload();
    });
  }
}
