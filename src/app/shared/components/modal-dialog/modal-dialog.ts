import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-modal-dialog',
  imports: [],
  templateUrl: './modal-dialog.html',
  styleUrl: './modal-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDialog {
  ngOnInit() { document.body.style.overflow = 'hidden'; }
  ngOnDestroy() { document.body.style.overflow = ''; }
  @Input() title = '';
  @Input() widthVariant: 'xs' | 'sm' = 'xs';
  @Output() close = new EventEmitter<void>();
  get widthClass(): string {
    switch (this.widthVariant) {
      case 'xs':
        return 'w-90 md:w-120.75';
      case 'sm':
        return 'w-90 md:w-150';
      default:
        return 'w-90 md:w-120.75';
    }
  }
  onBackdropClick() {
    this.close.emit();
  }
}
