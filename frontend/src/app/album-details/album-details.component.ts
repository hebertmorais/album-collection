import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../service/album.service';
import { Album } from '../models/album.model';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  album: Album;
  create: boolean;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.album = this.albumService.currentAlbum || new Album();
    if (!this.album.album_name) {
      this.create = true;
    }
  }

  save() {
    if (!this.create) {
      console.log("edit");

      this.albumService.editAlbum(this.album).subscribe((data: any) => {
        alert("editado");
      });
    } else {
      console.log("create");

      this.albumService.addAlbum(this.album).subscribe((data: any) => {
        this.create = false;
        console.log(data);
        this.album.id = data.insertId;
        alert("criado");
      });
    }
  }

  delete() {
    console.log("delete");
    this.albumService.deleteAlbum(this.album.id).subscribe((data: any) => {
      alert("deletado");
    });
  }

}
