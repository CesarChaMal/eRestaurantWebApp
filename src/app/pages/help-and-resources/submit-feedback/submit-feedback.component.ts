import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.scss']
})
export class SubmitFeedbackComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/help'])
  }

}
