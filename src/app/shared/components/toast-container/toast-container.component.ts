import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
})
export class ToastContainerComponent implements OnInit {
  constructor(public toast: ToastService) {}

  ngOnInit(): void {}

  isTemplate(toast: any): any {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
