import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Network } from '../config/global.config';

import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAllAlbums() {
    return this.http.get<Album>(`${Network.apiUrl}/`).pipe(
      catchError(this.errorHandler)
    );
  }

  /* query(keyword: string) {
      return this.http.get(`${NETWORK.apiUrl}/?q=${keyword}`)
          .map((res: Response) => res.json().response);
  }
  addAlbum(album: Album) {
      return this.http.post(`${NETWORK.apiUrl}/album`)
          .map((res: Response) => res.json().response);
  }*/

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

