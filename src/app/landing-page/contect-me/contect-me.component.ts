import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

@Component({
  selector: 'app-contect-me',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contect-me.component.html',
  styleUrl: './contect-me.component.scss'
})
export class ContectMeComponent implements OnInit {
     // Form data
  formData = {
    vorname: '',
    name: '',
    email: '',
    telefon: '',
    leistung: '',
    nachricht: ''
  };

  leistungen = [
    'Maurer Arbeiten',
    'Beton Arbeiten',
    'Abriss',
    'Verputzen',
    'Sanieren',
    'Sonstiges'
  ];

  uploadedImages: UploadedImage[] = [];
  isDragging = false;

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
      input.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  private handleFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImages.push({
            id: this.generateId(),
            file: file,
            preview: e.target?.result as string
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(id: string): void {
    this.uploadedImages = this.uploadedImages.filter(img => img.id !== id);
  }

  onSubmit(): void {
    console.log('Form Data:', this.formData);
    console.log('Uploaded Images:', this.uploadedImages);
    // Hier kannst du deine Validierung und Submit-Logik hinzufügen
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  ngOnInit() {
    // Form initialization logic can go here if needed
  }
}