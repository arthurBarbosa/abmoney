import { AuthService } from './../../../security/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  show: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  showMenu(): void {
    this.show = !this.show;
  }

  getNameUserLogged(): string {
    return this.auth.nameUserLogged;
  }

  hasAuthority(authorite: string): boolean {
    return this.auth.hasAnyPermissions(authorite);
  }

  logout(): void {
    this.auth.lougout();
  }

}
