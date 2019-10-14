import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { Album } from '../models/album.model';
import { Network } from '../config/global.config';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  album: Album;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.album = this.albumService.currentAlbum;
  }

  edit() {
    console.log("edit");
    this.albumService.editAlbum(this.album).subscribe((data: any) => {
      alert("editado");
    });
  }

  delete() {
    console.log("delete");
    this.albumService.deleteAlbum(this.album.id).subscribe((data: any) => {
      alert("deletado");
    });
  }

}
