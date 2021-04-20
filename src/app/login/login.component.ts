import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private router: Router,  private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.value.username=="comprador"){
      this.router.navigate(['principal']);
      localStorage.setItem("user", "1");
    }else if(this.loginForm.value.username=="vendedor"){
      this.router.navigate(['mitienda']);
      localStorage.setItem("user", "2");
    }else
      this.router.navigate(['login']);
  }

}
