// Scopo: servizio centralizzato per messaggi toast.
// Sezioni: modello dati, stato osservabile e API di gestione.
// Scelte UI/UX: auto-dismiss con durata breve e chiusura manuale.
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UiToastTone = 'success' | 'error' | 'info';

export interface UiToastMessage {
  id: string;
  title: string;
  message: string;
  tone: UiToastTone;
}

@Injectable({ providedIn: 'root' })
export class UiToastService {
  private readonly toastsSubject = new BehaviorSubject<UiToastMessage[]>([]);
  private readonly timeouts = new Map<string, ReturnType<typeof setTimeout>>();

  // Stream pubblico per i componenti toast.
  readonly toasts$ = this.toastsSubject.asObservable();

  // Mostra un toast generico.
  show(title: string, message: string, tone: UiToastTone = 'info', duration = 4000): void {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const nextToast: UiToastMessage = { id, title, message, tone };
    this.toastsSubject.next([...this.toastsSubject.value, nextToast]);

    const timeoutId = setTimeout(() => this.dismiss(id), duration);
    this.timeouts.set(id, timeoutId);
  }

  // Shortcut per successo.
  success(title: string, message: string): void {
    this.show(title, message, 'success');
  }

  // Shortcut per errore.
  error(title: string, message: string): void {
    this.show(title, message, 'error', 6000);
  }

  // Rimuove un toast per id.
  dismiss(id: string): void {
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }
    this.toastsSubject.next(this.toastsSubject.value.filter(toast => toast.id !== id));
  }
}
