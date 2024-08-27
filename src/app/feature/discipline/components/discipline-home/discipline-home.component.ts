import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discipline-home',
  templateUrl: './discipline-home.component.html',
  styleUrl: './discipline-home.component.scss'
})

export class DisciplineHomeComponent {

  constructor(private route : ActivatedRoute){

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
    });
  }
}
