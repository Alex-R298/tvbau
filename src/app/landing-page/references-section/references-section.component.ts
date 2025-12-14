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
  name = 'ReferencesSectionComponent';
  items: any[] = [
    {
      title: 'Maurerarbeiten',
      description: 'Professionelle Maurerarbeiten für Neubauten und Sanierungen.',
      image: '../../../assets/img/work1.jpg',
    },
    {
      title: 'Betonarbeiten',
      description: 'Hochwertige Beton- und Fundamentarbeiten.',
      image: '../../../assets/img/work2.jpg',
    },
    {
      title: 'Abrissarbeiten',
      description: 'Sichere und effiziente Abriss- und Rückbauarbeiten.',
      image: '../../../assets/img/abriss.jpg',
    },
  ];
  currentSlideIndex: number = 1;
  selectedImageIndex: number | null = null;

  constructor() {}

  ngOnInit() {}

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

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.items.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.items.length) % this.items.length;
  }
}