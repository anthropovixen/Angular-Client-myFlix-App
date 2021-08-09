import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  GetUserService,
  EditUserProfileService,
} from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss'],
})
export class UserProfileEditComponent implements OnInit {
  @Input() userData = { Username: '', Email: '', Birthday: '' };
  user: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: GetUserService,
    public fetchApiData2: EditUserProfileService,
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /** Function sends user profile form input to database to update user account details, then updates user profile in app */

  editUserProfile(): void {
    this.fetchApiData2.editUserProfile(this.userData).subscribe(
      (response) => {
        this.dialogRef.close(); //closes dialog box after editing profile
        localStorage.setItem('userName', response.Username);
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }
}
