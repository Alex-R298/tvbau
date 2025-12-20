import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

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
  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY;
    
    // Navbar ist scrolled wenn über 100px
    this.isScrolled = scrollTop > 100;
    
    // Verstecke Navbar beim Runterscrollen, zeige beim Hochscrollen
    // aber nur wenn man weit nach oben scrollt (über 300px)
    if (scrollTop > this.lastScrollTop && scrollTop > 150) {
      // Scrolling down
      this.isHidden = true;
    } else if (scrollTop < 300) {
      // Scrolling up UND unter 300px - zeige navbar
      this.isHidden = false;
    }
    
    this.lastScrollTop = scrollTop;
  }
}