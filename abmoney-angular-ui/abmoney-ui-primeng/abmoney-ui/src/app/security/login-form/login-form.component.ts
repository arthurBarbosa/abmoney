import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    this.auth.login(username, password).then(() => {
      this.router.navigate(['/lancamentos']);
    })
      .catch(erro => {
        console.log(erro)
        this.errorHandler.handle(erro);
      });
  }
}
