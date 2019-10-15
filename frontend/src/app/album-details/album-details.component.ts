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

    this.normalizeDate();
    console.log('date', this.album.release_date);
  }

  save() {
    console.log('save date', this.album.release_date);

    //this.normalizeDate();
    let error;
    if (!this.create) {
      console.log("edit");

      this.albumService.editAlbum(this.album, this.fileToUpload).subscribe((data: any) => {
        alert("Seu disco foi editado com sucesso");
      });
    } else {
      console.log("create");
      if (!this.album.album_name.trim() || !this.album.artist_name.trim() || !this.album.genre.trim() || !this.album.release_date.trim()) {
        error = true;
        alert('Todos os campos são necessários');

      }
      if (!error) {
        this.albumService.addAlbum(this.album, this.fileToUpload).subscribe((data: any) => {
          this.create = false;
          console.log(data);
          this.album.id = data.insertId;
          alert("Seu disco foi criado com sucesso.");
        });
      }
    }
  }

  delete() {
    console.log("delete");
    this.albumService.deleteAlbum(this.album.id).subscribe((data: any) => {
      alert("Seu disco foi deletado com sucesso");
      window.location.href = '/';
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

  preview(file) {

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.albumImage = reader.result;
    };
  }

  normalizeDate() {
    if (this.album.release_date)
      this.album.release_date = new Date(this.album.release_date).toISOString().split('T')[0];
  }


}
