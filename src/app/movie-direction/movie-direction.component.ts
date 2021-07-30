import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-direction',
  templateUrl: './movie-direction.component.html',
  styleUrls: ['./movie-direction.component.scss'],
})
export class MovieDirectionComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
    }
  ) {}

  ngOnInit(): void {}
}
