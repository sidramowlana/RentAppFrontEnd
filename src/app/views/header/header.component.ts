import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  id;
  userLoggedIn;

  constructor(private authService: AuthenticationService,
    private tokenStorageService: TokenStorageService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userLoggedIn = !!this.tokenStorageService.getToken(); //checking if the token is not null
    if (this.userLoggedIn) {
    const user = this.tokenStorageService.getUser();
    this.id = user.id;
    }
  }
  onLogout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }
  onProfile() {
    const user = this.tokenStorageService.getUser();
    this.id = user.id;
    console.log(this.id)
    this.router.navigate(['profile/', this.id]);
  }
}
