import { Injectable } from '@angular/core';
import { Movie } from './../models/movie.model';

@Injectable()
export class CartService {

    cart: Movie[] = [];

    addToCart(movie: Movie) {
      this.cart.push(movie);    
    }
    removeFromCart(movie: Movie){
      this.cart.splice(this.cart.indexOf(movie),1);
    }

}