import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-forum',
  templateUrl: './support-forum.component.html',
  styleUrls: ['./support-forum.component.scss']
})
export class SupportForumComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/help'])
  }

}
