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
    return this.http.get<Album>(`${Network.apiUrl}`).pipe(
      catchError(this.errorHandler)
    );
  }

  queryAlbums(keyword: string) {
    return this.http.get<Album>(`${Network.apiUrl}?q=${keyword}`).pipe(
      catchError(this.errorHandler)
    );
  }

  addAlbum(album: Album, image: File) {
    const formData: FormData = new FormData();

    if (image) { formData.append('image', image, image.name); }

    // tslint:disable-next-line:forin
    for (const key of Object.keys(album)) {
      formData.append(key, album[key]);
    }

    return this.http.post<Album>(`${Network.apiUrl}album/`, formData).pipe(
      catchError(this.errorHandler)
    );
  }

  editAlbum(album: Album, image: File) {
    const formData: FormData = new FormData();

    if (image) { formData.append('image', image, image.name); }

    // tslint:disable-next-line:forin
    for (const key of Object.keys(album)) {
      formData.append(key, album[key]);
    }

    return this.http.put<Album>(`${Network.apiUrl}album/${album.id}`, formData).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteAlbum(albumId: number) {
    return this.http.delete<Album>(`${Network.apiUrl}album/${albumId}`, {}).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message} \n ${JSON.stringify(error.error)}`;
    }
    console.log(errorMessage, error);
    alert('Houve algum erro, tente novamente mais tarde. Erro:\n' + errorMessage);
    return throwError(errorMessage);
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    let dd: any = date.getDate();
    let mm: any = date.getMonth() + 1;

    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return (dd + '/' + mm + '/' + yyyy);
  }
}

