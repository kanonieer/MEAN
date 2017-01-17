import { Component, OnInit } from '@angular/core';
import { MovieService } from './../services/movie.service';
import { About } from './../models/about.model';
 
@Component({
  selector: 'about-component',
  templateUrl: 'app/about/about.component.html'
})
export class AboutComponent {
  public about: About = {
    name: "",
    hours: {
      monday: "",
      thusday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: ""
    }
} ;

  constructor(private movieService: MovieService){

  }
  
  ngOnInit (){
    this.movieService.getAbout().subscribe(
      data =>  this.about = data,
    );
  }

}