import { Component } from '@angular/core';
import { Movie } from './../models/movie.model';

@Component({
  selector: 'home-component',
  templateUrl: 'app/home/home.component.html'
})
export class HomeComponent {
  public cart: Movie[] = [];

  addToCart(movieToCart : Movie){
    this.cart.push(movieToCart);
    console.log(this.cart.length);
  }
}