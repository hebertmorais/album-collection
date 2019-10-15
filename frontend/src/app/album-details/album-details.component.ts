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
  albumImage: any;
  fileToUpload: File = null;


  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.album = this.albumService.currentAlbum || new Album();
    if (!this.album.album_name) {
      this.create = true;
    }
    this.albumImage = this.album.artwork;
  }

  save() {
    if (!this.create) {
      console.log("edit");

      this.albumService.editAlbum(this.album, this.fileToUpload).subscribe((data: any) => {
        alert("editado");
      });
    } else {
      console.log("create");

      this.albumService.addAlbum(this.album, this.fileToUpload).subscribe((data: any) => {
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

  removeImage() {
    this.albumImage = '';
    this.fileToUpload = null;
    this.album.artwork = 'delete';
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.preview(this.fileToUpload);
  }

  preview(file): string {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.albumImage = reader.result;
    };
  }

}
