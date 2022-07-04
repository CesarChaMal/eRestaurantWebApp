import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/help'])
  }

}
