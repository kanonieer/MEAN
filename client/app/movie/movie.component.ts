import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Movie } from "../models/movie.model";
import { CartService } from "../services/cart.service";

@Component({
  selector: 'movie-component',
  templateUrl: 'app/movie/movie.component.html'
})
export class MovieComponent {
  constructor(private cartService: CartService){

  }
  @Input() movie: Movie;
  
  @Output() addMovieToCart : EventEmitter<Movie> =
    new EventEmitter<Movie>();

  addMovie () {
    this.cartService.addToCart(this.movie);
    //this.addMovieToCart.emit(this.movie);
  }  
}
