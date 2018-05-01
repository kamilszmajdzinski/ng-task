import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import { Character } from '../../shared/character.model';

@Injectable()
export class DataService {

  page: number;
  term: string;
  character: Character;

  constructor(public http:Http) { }

  getPost(page){
    return this.http.get(`http://localhost:3000/characters?_page=${page}`)
      .map(res => res.json())
  }

  deletePost(post){
    return this.http.delete(`http://localhost:3000/characters/${post}`)
    .map(res => res.json())
  }

  getResults(term) {
    return this.http.get(`http://localhost:3000/characters?q=${term}`)
    .map(res => res.json())
  }

  getAllChar(){
    return this.http.get(`http://localhost:3000/characters`)
    .map(res => res.json())
  }

  getSpecies() {
    return this.http.get(`http://localhost:3000/species`)
    .map(res => res.json())
  }

  postCharacter(character) : Promise<Character> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/characters', character, options).toPromise()
	          .then(this.extractData)
            .catch(this.handleErrorPromise);
  }

  private extractData(res) {
          let body = res.json();
          return body || {};
  }

  private handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
      }	

}
