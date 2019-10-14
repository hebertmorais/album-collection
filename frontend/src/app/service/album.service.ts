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

  public currentAlbum: Album;

  constructor(private http: HttpClient) { }

  getAllAlbums() {
    return this.http.get<Album>(`${Network.apiUrl}/`).pipe(
      catchError(this.errorHandler)
    );
  }

  queryAlbums(keyword: string) {
    return this.http.get<Album>(`${Network.apiUrl}/?q=${keyword}`).pipe(
      catchError(this.errorHandler)
    );
  }
  /*
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

