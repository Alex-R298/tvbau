import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-references-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references-section.component.html',
  styleUrl: './references-section.component.scss'
})
export class ReferencesSectionComponent {
  // Füge hier am besten 4 Items hinzu, damit das Raster gut aussieht
  items: any[] = [
    {
      title: 'Gewerbepark West',
      description: 'Kompletter Rohbau und Betonkernaktivierung für 5000m² Bürofläche.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop', // Beispielbild Bau
    },
    {
      title: 'Villa Riverside',
      description: 'Exklusiver Neubau mit Sichtbeton-Elementen.',
      image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop',
    },
    {
      title: 'Brückensanierung A4',
      description: 'Spezialabbruch und Instandsetzung der tragenden Teile.',
      image: 'https://images.unsplash.com/photo-1590644365607-1c5a2e9a5a75?q=80&w=1000&auto=format&fit=crop',
    },
    {
        title: 'Stadtquartier Mitte',
        description: 'Maurerarbeiten für 40 Wohneinheiten.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop',
    }
  ];
  
  selectedImageIndex: number | null = null;

  openModal(index: number) {
    this.selectedImageIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedImageIndex = null;
    document.body.style.overflow = 'auto';
  }

  nextImage() {
    if (this.selectedImageIndex !== null) {
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.items.length;
    }
  }

  prevImage() {
    if (this.selectedImageIndex !== null) {
      this.selectedImageIndex = (this.selectedImageIndex - 1 + this.items.length) % this.items.length;
    }
  }
}