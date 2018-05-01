import { Component, OnInit } from '@angular/core';
import { DataService } from "../services/data.service";
import { Character } from '../../shared/character.model';
import { Router } from '@angular/router';


@Component({
  selector: 'add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent implements OnInit {

  species: string[];
  character: Character = new Character('', '', '', '');
  isNameInvalid: boolean = false;
  isSpecieInvalid: boolean = false;
  isGenderInvalid: boolean = false;
  errorMessage: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getSpecies().subscribe((species) => {
      this.species = species;
    })
  }

  nameValid(){
    if (!this.character.name) {
      this.isNameInvalid = true;
    }else {
      this.isNameInvalid = false;
    }
  }

  specieValid() {
    if (!this.character.species) {
      this.isSpecieInvalid = true;
    }else {
      this.isSpecieInvalid = false;
    }
  
  }

  onSubmit(){
    if(!this.character.gender){
      this.isGenderInvalid = true;
    }else this.isGenderInvalid = false;
    this.nameValid();
    this.specieValid();

    if (!this.isNameInvalid && !this.isGenderInvalid && !this.isSpecieInvalid) {
      this.dataService.postCharacter(this.character)
      .then(error => this.errorMessage = <any>error)
      if (!this.errorMessage) {
        this.router.navigateByUrl('/')
      }
    }
  }

}
