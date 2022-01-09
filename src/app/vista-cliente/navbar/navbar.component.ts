import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  user : any;
  username: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.username = localStorage.getItem("username");
  }

  logout(): void{
    localStorage.setItem("productos_id", '');
    localStorage.setItem("cantidad", '');

    this.router.navigate(['login']);
  
  }


}
