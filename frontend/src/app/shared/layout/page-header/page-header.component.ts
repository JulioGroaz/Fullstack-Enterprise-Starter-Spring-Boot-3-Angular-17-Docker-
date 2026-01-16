// Scopo: header di pagina con titolo, breadcrumb e azioni.
// Sezioni: input dati e definizione breadcrumb.
// Scelte UI/UX: gerarchia tipografica chiara e azioni allineate.
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface PageBreadcrumb {
  label: string;
  url?: string;
}

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  // Titolo principale della pagina.
  @Input() title = '';
  // Sottotitolo descrittivo.
  @Input() subtitle = '';
  // Lista breadcrumb opzionale.
  @Input() breadcrumbs: PageBreadcrumb[] = [];
}
