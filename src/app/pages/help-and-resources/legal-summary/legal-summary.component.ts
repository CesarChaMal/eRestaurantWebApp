import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-summary',
  templateUrl: './legal-summary.component.html',
  styleUrls: ['./legal-summary.component.scss']
})
export class LegalSummaryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/help'])
  }

}
