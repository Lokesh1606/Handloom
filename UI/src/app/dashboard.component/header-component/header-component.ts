import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConfiguration } from '../../config/appConfig';
import { Dropdown } from '../../model/dropdown.model';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [ButtonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent implements OnInit{


  dropdown :any[] =[]
  login: boolean=true;
  userName : string='';

  constructor(private http : HttpClient,
    private route : Router
  ){}
  ngOnInit(): void {
    this.http.get<Dropdown[]>(AppConfiguration.headerDrowdown).subscribe({
      next:(res : Dropdown[])=>{
        this.dropdown = res;
        console.log(this.dropdown)
      }
    }
      
    );
  }
  onLogin() {
    this.userName = 'Hi Lokesh'
    this.login = false;
    this.route.navigate(['login'])
  }

  headerAction(arg0: any) {
    console.log("console"+arg0)

  }
}


