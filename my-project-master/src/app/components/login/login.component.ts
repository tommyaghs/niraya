// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent {
//   constructor(
//     private router: Router,
//     private activatedRoute: ActivatedRoute,
//     private authService: AuthService
//   ) {}

//   email: string = '';
//   password: string = '';

//   login() {
//     const loginData = {
//       email: this.email,
//       password: this.password
//     };

//     // Chiama la funzione di login del servizio
//     this.authService.loginUser(loginData).subscribe(
//       (response: any) => {
//         console.log('Login avvenuto con successo!');
//         const token = response.token;
//         // Salva il token nei cookie o nello storage del browser
//         // Ad esempio, puoi usare i cookie con 'ngx-cookie-service'
//         // o il localStorage con 'localStorage.setItem("token", token);'
//         // Dopo aver salvato il token, puoi reindirizzare l'utente alla pagina desiderata
//         this.router.navigate(['/user-space']);
//       },
//       (error: any) => {
//         console.error('Errore durante il login:', error);
//         alert('Credenziali non valide.');
//       }
//     );
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  email: string = '';
  password: string = '';

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.loginUser(loginData).subscribe(
      (response: any) => {
        console.log('Login avvenuto con successo!');
        const pulsanteChiusura: any = document.getElementById('close-modal-access');
        pulsanteChiusura.click();
        this.authService.saveToken(response.token); // Salva il token ricevuto
        this.router.navigate(['/user-space']); // Reindirizza l'utente alla pagina desiderata

      },
      (error: any) => {
        console.error('Errore durante il login:', error);
        alert('Credenziali non valide.');
      }
    );
  }
}
