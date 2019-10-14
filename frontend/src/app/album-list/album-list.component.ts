import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  albums: Album[] = [];

  constructor(public albumService: AlbumService) { }

  ngOnInit() {
    this.loadAlbums();
  }

  loadAlbums() {
    this.albumService.getAllAlbums().subscribe((data: any) => {
      console.log(data);
      this.albums = data;
    });
  }

}
