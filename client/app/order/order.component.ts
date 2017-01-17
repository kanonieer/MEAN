import { Component } from '@angular/core';
import { CartService } from './../services/cart.service'; 
import { BorrowService } from './../services/borrow.service';
import { Movie } from './../models/movie.model';
import { Borrow } from './../models/borrow.model';

@Component({
  selector: 'order-component',
  templateUrl: 'app/order/order.component.html'
})
export class OrderComponent {

  constructor(private cartService: CartService,
   private borrowService: BorrowService ){

  }
  totalCost(){
    let totalCost = 0;
    this.cartService.cart.forEach(value => totalCost += value.fee);
    return totalCost;      
  }
  submitForm(data: any){
    console.log(data)
    var arr: Array<number> = [];
    this.cartService.cart.forEach(movie => arr.push(movie.id));

    var borrow: Borrow = {
      form: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: parseInt(data.phone, 10)
      },
      movieIds: arr
    }
    console.log(borrow);
    console.log(JSON.stringify(borrow));
    this.borrowService.borrowMovies(borrow).subscribe(
      data => console.log(data));
  }
}