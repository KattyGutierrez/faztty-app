import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-negocio',
  templateUrl: './navbar-negocio.component.html',
  styleUrls: []
})
export class NavbarNegocioComponent implements OnInit {

  user : any;
  username: any;
  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.username = localStorage.getItem("username");
  }

}
