import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }
  onLogout() {

    this.tokenStorage.signOut();
    this.router.navigate(['/']);
    // window.location.reload();
  }
}
