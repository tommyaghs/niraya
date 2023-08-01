import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor
    (private router: Router, private activatedRoute: ActivatedRoute, private commonService: CommonService) {
  }
  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }
}
