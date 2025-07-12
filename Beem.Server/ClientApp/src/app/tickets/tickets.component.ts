import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  iframeHeight = 3000; // Fallback-Wert

  ngOnInit(): void {
    this.adjustIframeHeight();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.adjustIframeHeight();
  }

  adjustIframeHeight(): void {
    const vh = window.innerHeight;

    // Beispiel: Setze mindestens 2000px, aber nicht weniger als 2x Viewporthöhe
    this.iframeHeight = Math.max(2000, vh * 2);
  }
}
