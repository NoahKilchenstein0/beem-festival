import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  public getArtists(){
    return this.http.get<Artist[]>('/api/Artists');
  }

  public getArtistsActive(){
    return this.http.get<Artist[]>('/api/Artists/GetActive');
  }

  public getArtistSingle(id: number){
    return this.http.get<Artist>('/api/Artists/GetSingle('+ id + ')');
  }

  public createArtist(artist: Artist){
    return this.http.post<Artist>('/api/Artists', artist);
  }

  public updateArtist(artist: Artist){ 
    console.log(artist)
    return this.http.put<Artist>('/api/Artists/Update('+ artist.Id + ')', artist);
  }

  public deleteArtist(id: number){
    return this.http.delete<void>('/api/Artists/Delete('+ id + ')');
  }
}
