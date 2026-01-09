import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {
  
  services = [
    {
      title: 'Betonarbeiten',
      description: 'Fundamente, Decken und Bodenplatten. Wir gießen Präzision in Form.',
      image: '../../../assets/img/beton.jpg'
    },
    {
      title: 'Maurerarbeiten',
      description: 'Klassisches Handwerk neu definiert. Vom Rohbau bis zur Verblendung.',
      image: '../../../assets/img/maurer.jpg'
    },
    {
      title: 'Rohrleitungen',
      description: 'Installation und Wartung von komplexen Versorgungssystemen.',
      image: '../../../assets/img/rohr.jpg'
    },
    {
      title: 'Abrissarbeiten',
      description: 'Platz für Neues schaffen. Kontrollierter Rückbau und Entsorgung.',
      image: '../../../assets/img/abriss.jpg'
    }
  ];

}