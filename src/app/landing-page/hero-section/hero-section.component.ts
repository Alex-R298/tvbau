import { Component, ElementRef, NgZone, OnDestroy, AfterViewInit, ViewChild, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('blueprintCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  private particles: Particle[] = [];
  private mouse = { x: -1000, y: -1000 }; // Maus initial außerhalb
  private isBrowser: boolean;
  
  // Konfiguration für den Look
  private readonly particleCount = 70; // Anzahl der Punkte
  private readonly connectionDistance = 150; // Max Distanz für Linien
  private readonly mouseDistance = 200; // Radius um die Maus
private readonly brandColor = '128, 0, 50'; // Das ist dein Rot #800032 in RGB

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initCanvas();
      
      // Animation außerhalb von Angular Zone starten für Performance
      this.ngZone.runOutsideAngular(() => {
        this.animate();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // Track Mouse Movement
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isBrowser) {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.mouse.x = event.clientX - rect.left;
      this.mouse.y = event.clientY - rect.top;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.resizeCanvas();
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createParticles();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createParticles(): void {
    this.particles = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5, // Langsame Geschwindigkeit
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    
    this.updateParticles();
    this.drawConnections();
    this.drawMouseInteraction();

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private updateParticles(): void {
    const width = this.canvasRef.nativeElement.width;
    const height = this.canvasRef.nativeElement.height;

    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Abprallen an den Rändern
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Zeichne den Punkt (kleine Quadrate wirken technischer als Kreise)
      this.ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
      this.ctx.fillRect(p.x, p.y, p.size, p.size);
    });
  }

  private drawConnections(): void {
    // Verbinde Punkte untereinander, wenn sie nah sind
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          this.ctx.beginPath();
          // Deckkraft basierend auf Distanz
          const opacity = 1 - (dist / this.connectionDistance);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
          this.ctx.lineWidth = 0.5; // Sehr dünne Linien für "Zeichnungs-Look"
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private drawMouseInteraction(): void {
    // Verbinde Maus mit Punkten in der Nähe
    this.particles.forEach(p => {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouseDistance) {
        this.ctx.beginPath();
        const opacity = 1 - (dist / this.mouseDistance);
        
        // HIER kommt dein Rot ($primary-red) ins Spiel für die aktive Interaktion
        this.ctx.strokeStyle = `rgba(${this.brandColor}, ${opacity * 0.8})`; 
        this.ctx.lineWidth = 1; 
        this.ctx.moveTo(this.mouse.x, this.mouse.y);
        this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();

        this.ctx.fillStyle = `rgba(${this.brandColor}, 0.5)`;
        this.ctx.fillRect(p.x - 1, p.y - 1, p.size + 2, p.size + 2);
      }
    });

  
    if (this.mouse.x > 0) {
        this.ctx.strokeStyle = `rgba(${this.brandColor}, 0.3)`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouse.x - 10, this.mouse.y);
        this.ctx.lineTo(this.mouse.x + 10, this.mouse.y);
        this.ctx.moveTo(this.mouse.x, this.mouse.y - 10);
        this.ctx.lineTo(this.mouse.x, this.mouse.y + 10);
        this.ctx.stroke();
    }
  }
}