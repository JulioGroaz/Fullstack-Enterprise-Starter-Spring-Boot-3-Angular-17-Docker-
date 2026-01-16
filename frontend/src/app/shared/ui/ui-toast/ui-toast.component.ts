// Scopo: contenitore che renderizza i toast in overlay.
// Sezioni: stream dei toast e handler di chiusura.
// Scelte UI/UX: posizionamento in alto a destra con animazioni leggere.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiToastMessage, UiToastService } from './ui-toast.service';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-toast.component.html',
  styleUrls: ['./ui-toast.component.css']
})
export class UiToastComponent {
  // Stream osservabile dei toast attivi.
  readonly toasts$ = this.toastService.toasts$;

  constructor(private toastService: UiToastService) {}

  // TrackBy per performance.
  trackById(_: number, toast: UiToastMessage): string {
    return toast.id;
  }

  // Chiude manualmente un toast.
  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
