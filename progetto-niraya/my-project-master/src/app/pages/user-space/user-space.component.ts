import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service'; // Assicurati di importare il servizio AuthService correttamente

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.scss']
})
export class UserSpaceComponent implements OnInit { // Implementa l'interfaccia OnInit per usare ngOnInit()

  userspace: string = 'Profilo';
  isLogged: boolean = false; // Variabile per memorizzare lo stato di autenticazione

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService // Inietta il servizio AuthService nel costruttore
  ) { }

  ngOnInit() {
    this.isLogged = this.authService.isAuthenticated(); // Verifica se l'utente è autenticato all'avvio del componente
  }

  goToSelection(pagina: string) {
    this.userspace = pagina;
  }

  logout() {
    this.authService.logout(); // Utilizza il metodo logout() del servizio AuthService per effettuare il logout
    this.router.navigate(['/dashboard']);
    this.document.body.scrollTo(0, 0);
  }
}
