import { Component, OnInit, NgZone } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { Album } from '../models/album.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  albums: Album[] = [];
  keyword = '';
  waiting = false;
  isHome: boolean;

  constructor(public albumService: AlbumService, private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
    this.loadAlbums();
  }

  loadAlbums() {
    this.waiting = true;
    this.albumService.getAllAlbums().subscribe((data: any) => {
      console.log(data);
      this.albums = data;
      this.waiting = false;
      this.isHome = true;
    });
  }

  query() {
    this.waiting = true;

    setTimeout(() => {

      if (this.keyword) {
        this.queryAlbums();
      } else {
        this.loadAlbums();
      }

    }, 1200);
  }


  queryAlbums() {
    this.waiting = true;
    this.albumService.queryAlbums(this.keyword).subscribe((data: any) => {
      console.log(data);
      this.albums = data;
      this.waiting = false;
      this.isHome = false;
    });

  }

  addAlbum() {
    this.ngZone.run(() => this.router.navigate(['/album-details']));
  }
  clearSearch() {
    this.keyword = '';
    this.loadAlbums();
  }

  openAlbum(album: Album) {
    this.albumService.currentAlbum = album;
    this.ngZone.run(() => this.router.navigate(['/album-details']));
  }

  getDate(dateString: string): string {
    return this.albumService.formatDate(dateString);
  }

}
