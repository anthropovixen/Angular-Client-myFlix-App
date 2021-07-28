import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public router: Router, public snackBar: MatSnackBar) {}
  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('You have logged out', 'OK', {
      duration: 1000,
    });
  }
}
