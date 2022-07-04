import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/help'])
  }

}
