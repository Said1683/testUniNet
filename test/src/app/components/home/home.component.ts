import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/film';
import { FilmsService } from 'src/app/services/films.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listFilms: any =[];
  constructor(
    private _filmsService: FilmsService,
  ) { }

  ngOnInit(): void {
    this.getfilms()
  }

  //Obtenemos todos los episodios de SWAPI star wars
  getfilms(){
    this._filmsService.getFilms().subscribe(
      res=>{
        this.listFilms = res['results']
        console.log(res)
        console.log(this.listFilms)
      }
    );

  }

}