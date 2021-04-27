import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  user : any;
  username: any;
  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.username = localStorage.getItem("username");
  }

}
