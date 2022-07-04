import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/help'])
  }

}
