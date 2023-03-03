import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from 'src/app/services/films.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  id: number;
  data: any = {};
  data2: any = {};
  listCharec: any = [];
  listPlanets: any = [];
  listStarships: any = [];

  nameCharec: any = [];
  namePlanets: any = [];
  nameStarships: any = [];

  datos: string[] =[]
  datos2: string[] =[]
  datos3: string[] =[]

  constructor(
    private _filmsService: FilmsService,
    private aRouter: ActivatedRoute,
    private http: HttpClient
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    //console.log(this.id);
  }

  ngOnInit(): void {
    this. getDataFilm()
  }
  //Obtenenmos todos los datos del episodio
  getDataFilm() {
    console.log(this.id);
    //Obtenenmos los detalles del episodio selecionado por id
    this._filmsService.getFilmById(this.id).subscribe(
      res => {
        this.data = res
        this.listCharec = res.characters;
        this.listPlanets = res.planets;
        this.listStarships = res.starships;
        this.datos = this.listPlanets
        //Obtenenmos los planetas que muestra el episodio
        const todos = this.datos.map( t => this.http.get<any>(`${t}`));
        forkJoin(todos).subscribe(
          res => {
            this.namePlanets = res.sort()
            console.log(res)
          }
          );

        this.datos2 = this.listCharec
        //Obtenenmos los perosnajes que muestra el episodio
        const todos1 = this.datos2.map( t => this.http.get<any>(`${t}`));
        forkJoin(todos1).subscribe(
          res => {
            this.nameCharec = res.sort()
            console.log(res)
          }
          );

        this.datos3 = this.listStarships
        //Obtenenmos las naves que muestra el episodio
        const todos2 = this.datos3.map( t => this.http.get<any>(`${t}`));
        forkJoin(todos2).subscribe(
          res => {
            this.nameStarships = res.sort()
            console.log(res)
          }
          );
      }
    );
  }

}

