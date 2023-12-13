import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) { }
  onLogin(): void {
    this.authService.login('john.due@gmail.com', '123456').subscribe(user => {
      console.log(user);
      this.router.navigate(['/'])
    });
  }
}
