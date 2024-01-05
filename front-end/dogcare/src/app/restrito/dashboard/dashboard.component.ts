import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor ( private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
			if (params['id']) {
        // const idNumber = parseInt(params['id'])
                          // Se tem Id, faz alguma coisa
			}
		});
  }

}
