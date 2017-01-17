import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent }  from './app.component';
import { MovieComponent } from './movie/movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { OrderComponent } from './order/order.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MyCartComponent } from './my-cart/my-cart.component';

import { MovieService } from './services/movie.service';
import { CartService } from './services/cart.service';
import { BorrowService } from './services/borrow.service';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: HomeComponent },
    { path: 'list/:category', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'order', component: OrderComponent },
];

@NgModule({
  declarations: [ AppComponent, MovieComponent, MovieListComponent,
    OrderComponent, AboutComponent, HomeComponent, MyCartComponent ],
  imports: [ BrowserModule, HttpModule, FormsModule,
    ReactiveFormsModule, RouterModule.forRoot( routes )],
  bootstrap: [ AppComponent ],
  providers: [ MovieService, CartService, BorrowService ]
})
export class AppModule { }
