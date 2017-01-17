import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { About } from './../models/about.model';
import { Movie } from './../models/movie.model';

@Injectable()
export class MovieService {
    private url = 'http://localhost:8081/api';

    constructor(private http: Http) {
    }
    getAbout () : Observable<About>{
        return this.http.get(this.url+'/about')
            .map(response => response.json());
    }

    getMovies (category: string) : Observable<Movie[]>{
        if(category === undefined){
            return this.http.get(this.url+'/movies')
                .map(response => response.json());            
        }else{
            return this.http.get(this.url+'/movies/'+category)
                .map(response => response.json());              
        }
    }
}