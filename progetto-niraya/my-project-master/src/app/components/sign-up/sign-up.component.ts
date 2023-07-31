import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  // Variabili per i campi
  fullName: string = '';
  email: string = '';
  password: string = '';

  // Variabile per l'ID utente
  userId: number = 0;

  // Funzione per la registrazione
  registerUser() {
    const newUser = {
      fullName: this.fullName,
      email: this.email,
      password: this.password
    };

    // Prima di chiamare la registrazione, controlliamo se l'email esiste già
    this.authService.checkEmailExists(this.email).subscribe(
      (emailExists: boolean) => {
        if (emailExists) {
          // Mostra l'alert se l'email esiste già
          alert('Utente già registrato!');
        } else {
          const pulsanteChiusura: any = document.getElementById('close-modal');
          pulsanteChiusura.click();

          // Procedi con la registrazione inviando i dati al server
          this.authService.registerUser(newUser).subscribe(
            (response) => {
              // Otteniamo l'ID utente generato dal backend
              this.userId = response.userId;

              console.log('Registrazione avvenuta con successo!');
              alert('Registrazione andata a buon fine');
              this.router.navigate(['/dashboard']);
            },
            (error) => {
              console.error('Errore durante la registrazione:', error);
              // Gestione degli errori...
              alert('Registrazione fallita');
            }
          );
        }
      },
      (error) => {
        console.error('Errore durante la verifica dell\'email:', error);
        alert('Errore durante la verifica dell\'email');
      }
    );
  }
}
