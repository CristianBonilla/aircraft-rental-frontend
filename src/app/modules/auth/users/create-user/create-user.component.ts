import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { DEFAULT_MODAL_OPTIONS } from 'src/app/models/modal';
import { APP_ROUTES } from 'src/app/models/routes';

@Component({
  selector: 'arf-create-user',
  templateUrl: './create-user.component.html',
  styles: []
})
export class CreateUserComponent implements AfterViewInit {
  @ViewChild('userTemplate')
  readonly userTemplate: TemplateRef<NgbActiveModal>;
  private modalRef: NgbModalRef;

  constructor(private modal: NgbModal, private router: Router) { }

  ngAfterViewInit() {
    this.modalRef = this.modal.open(this.userTemplate, DEFAULT_MODAL_OPTIONS);
    this.createUserHidden();
  }

  createUserHidden() {
    this.modalRef.hidden.pipe(take(1))
      .subscribe(_ => this.router.navigate([ APP_ROUTES.HOME.USERS ]));
  }

  close(active: NgbActiveModal) {
    active.close(null);
  }
}
