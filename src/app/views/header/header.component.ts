import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/tokenStorage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private tokenStorage:TokenStorageService) { }

  ngOnInit() {
  }

}
