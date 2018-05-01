import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { Character } from "../../shared/character.model";

@Component({
  selector: "sl-list-view",
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"]
})
export class ListViewComponent implements OnInit {
  characters: Character[];
  pages: number[] = [];
  allCharacters: Character[];
  page: number;
  term: string;
  noResults: boolean = false;
  searching: boolean = false;

  constructor(private dataService: DataService) {}

  initializeList() {
    this.dataService.getAllChar().subscribe(allCharacters => {
      this.pages = [];
      let pages = Math.ceil(allCharacters.length / 10);
      for (let i = 1; i <= pages; i++) {
        this.pages.push(i);
      }
    });

    this.dataService.getPost(1).subscribe(characters => {
      this.characters = characters;
    });
  }

  ngOnInit() {
    this.initializeList();
  }

  getData(page) {
    this.dataService.getPost(page).subscribe(characters => {
      this.characters = characters;
    });
  }

  change(term) {
    this.dataService.getResults(term).subscribe(characters => {
      if (characters.length === 0) {
        this.characters = [];
        this.noResults = true;
        this.searching = true;
      } else {
        this.characters = characters;
        this.noResults = false;
        this.searching = true;
      }

      if (!term) {
        this.dataService.getPost(1).subscribe(characters => {
          this.characters = characters;
          this.searching = false;
        });
      }
    });
  }

  removeCharacter(id) {
    this.dataService.deletePost(id).subscribe(res => console.log(res));
    this.initializeList();
  }
}
