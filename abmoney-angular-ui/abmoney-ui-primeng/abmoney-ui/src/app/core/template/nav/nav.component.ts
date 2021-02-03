import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  show:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

showMenu(): void{
  this.show = !this.show;
}

}