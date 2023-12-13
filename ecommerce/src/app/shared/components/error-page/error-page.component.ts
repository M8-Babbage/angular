import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  msgs1: any = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.msgs1 = [
      { severity: 'error', summary: '404', detail: 'Route not found' },
    ];

    setTimeout(() => {
      this.router.navigate(['']);
    }, 3000);  //5s
  }

}
