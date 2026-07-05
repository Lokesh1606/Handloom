import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-component.html',
  styleUrls: ['./alert-component.scss'],
})
export class AlertComponent {
  @Input() message = 'Alert';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}

