import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ask-the-community',
  templateUrl: './ask-the-community.component.html',
  styleUrls: ['./ask-the-community.component.scss']
})
export class AskTheCommunityComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/help'])
  }

}
