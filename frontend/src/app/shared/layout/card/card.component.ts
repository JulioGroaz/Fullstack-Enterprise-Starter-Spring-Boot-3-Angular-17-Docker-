// Scopo: contenitore standard per sezioni a card.
// Sezioni: nessuna logica, solo proiezione contenuto.
// Scelte UI/UX: superfici coerenti e spazio interno costante.
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {}
