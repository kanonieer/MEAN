import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { Borrow } from './../models/borrow.model';

@Injectable()
export class BorrowService {
    private url = 'http://localhost:8081/api';

    constructor(private http: Http) {
    }
    borrowMovies (data: Borrow){
        return this.http.post(this.url+'/borrow',JSON.stringify(data))
            .map(response => response.json());
    }
}