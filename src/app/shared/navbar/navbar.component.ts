import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isScrolled = false;
  isHidden = false;
  private lastScrollTop = 0;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.isBrowser) return;

    const scrollTop = window.scrollY;
    
    // 1. SCROLLED STATE (Kleiner werden)
    // Sobald wir 50px gescrollt haben, wird die Navbar kompakt
    this.isScrolled = scrollTop > 50;
    
    // 2. HIDDEN STATE (Verstecken / Zeigen)
    // Nur aktiv, wenn wir schon etwas weiter unten sind (> 200px)
    if (scrollTop > 200) {
        if (scrollTop > this.lastScrollTop) {
            // Wir scrollen RUNTER -> Verstecken
            this.isHidden = true;
        } else {
            // Wir scrollen HOCH -> Zeigen
            this.isHidden = false;
        }
    } else {
        // Ganz oben immer sichtbar
        this.isHidden = false;
    }
    
    this.lastScrollTop = scrollTop;
  }
}