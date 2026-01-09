import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UploadedFile {
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
export class ContectMeComponent {
  
  formData = {
    vorname: '',
    name: '',
    email: '',
    telefon: '',
    leistung: '', // String instead of object
    nachricht: ''
  };

  // Simplified for Tile Selection
  leistungen = [
    'Neubau',
    'Sanierung',
    'Betonarbeiten',
    'Tiefbau',
    'Gewerbebau',
    'Beratung'
  ];

  uploadedImages: UploadedFile[] = [];
  isDragging = false;

  selectLeistung(option: string) {
    this.formData.leistung = option;
  }

  // File Handling Logic
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
      input.value = ''; // Reset
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  private handleFiles(files: FileList): void {
    Array.from(files).forEach(file => {
      // Simple ID generation
      const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
      const preview = URL.createObjectURL(file);
      this.uploadedImages.push({ id, file, preview });
    });
  }

  removeImage(id: string): void {
    this.uploadedImages = this.uploadedImages.filter(img => img.id !== id);
  }

  onSubmit() {
    console.log('Sende Daten...', this.formData, this.uploadedImages);
    // Hier Service Anbindung
  }
}