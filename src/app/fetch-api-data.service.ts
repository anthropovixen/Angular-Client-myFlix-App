import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**Declares the API URL that will provide data for the client app*/
const apiUrl = 'https://myflix-movies-app.herokuapp.com/';

/** USER ROUTES */

/** API call to user registration endpoint
 * @param userDetails - registration details for new user
 */

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  /** Injects the HttpClient module into the constructor params providing
   * module to the entire class, making it available via this.http*/
  constructor(private http: HttpClient) {}

  /**  Makes the API call for user registration point*/
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /** Handles error to register new user account
   * @param error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

/** API call to User Login
 * @param userDetails - login details for current user
 */
@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  /** Injects the HttpClient module into the constructor params providing
   * module to the entire class, making it available via this.http*/
  constructor(private http: HttpClient) {}

  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /** Handles error for user login
   * @param error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error with login, please try again later.');
  }
}

/** API call to get user account details
 * @param userName
 */
@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    return this.http
      .get(apiUrl + `users/${userName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | {}): Response | {} {
    const body = res;
    console.log(body);
    return body || {};
  }

  /** Handles error to get user account details
   * @param error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error retrieving user account, please try again later.');
  }
}

/** API call to add movie to user's list of favorites
 * @param id
 */

@Injectable({
  providedIn: 'root',
})
export class AddFavoriteMovieService {
  constructor(private http: HttpClient) {}

  addFavoriteMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    return this.http
      .get(apiUrl + `users/${userName}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /** Handles errors to add movie to user's favorite movies list */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Error adding movie to favorites list; please try again later.'
    );
  }
}

/** API call to edit User Profile
 * @param userDetails
 */
@Injectable({
  providedIn: 'root',
})
export class EditUserProfileService {
  constructor(private http: HttpClient) {}

  editUserProfile(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    return this.http
      .put(apiUrl + `users/${userName}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /** Handles errors to edit user account details
   * @param error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Error editing user info, please try again later.');
  }
}

/** API call to delete User Profile
 * @param userName
 */
@Injectable({
  providedIn: 'root',
})
export class DeleteUserProfileService {
  constructor(private http: HttpClient) {}

  deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    return this.http
      .delete(apiUrl + `users/${userName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /** Handles error to delete user profile */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

/** API call to remove movie from user's favorites list
 * @param id
 */
@Injectable({
  providedIn: 'root',
})
export class DeleteMovieFavoritesService {
  constructor(private http: HttpClient) {}

  // Making the API call to delete movie from favorites list
  public deleteMovieFavorites(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    return this.http
      .delete(apiUrl + `users/${userName}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  //** Handles error to delete movie from favorites list */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Error deleting movie from favorites list, please try again later.'
    );
  }
}

/** MOVIE ROUTES
 *
 */
/** API call to fetch all movie data */
@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Error getting list of all movies, please try again later.'
    );
  }
}

/** API call to fetch director's movie data*/
@Injectable({
  providedIn: 'root',
})
export class GetDirectionService {
  constructor(private http: HttpClient) {}

  getDirection(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /** Handles errors to fetch director's movie data  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

/** API call to fetch genre's movie data*/
@Injectable({
  providedIn: 'root',
})
export class GetGenreService {
  constructor(private http: HttpClient) {}

  public getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /** Handles errors to fetch genre's movie data  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
// /** API call to get details about a specific movie */
// @Injectable({
//   providedIn: 'root',
// })
// export class GetOneMovieService {
//   constructor(private http: HttpClient) {}

//   // Making the API call to get movie information
//   getOneMovie(): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http
//       .get(apiUrl + 'movies/:Title', {
//         headers: new HttpHeaders({
//           Authorization: 'Bearer ' + token,
//         }),
//       })
//       .pipe(map(this.extractResponseData), catchError(this.handleError));
//   }

//   // Non-typed response extraction
//   private extractResponseData(res: Response | Object): any {
//     const body = res;
//     return body || {};
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred:', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
//       );
//     }
//     return throwError(
//       'Error getting information from this movie, please try again later.'
//     );
//   }
// }

export class FetchApiDataService {
  constructor() {}
}
