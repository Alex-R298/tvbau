import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ServicesSectionComponent } from './services-section/services-section.component';
import { ReferencesSectionComponent } from './references-section/references-section.component';
import { CompanySectionComponent } from './company-section/company-section.component';
import { ContectMeComponent } from './contect-me/contect-me.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeroSectionComponent, ServicesSectionComponent, ReferencesSectionComponent, ContectMeComponent, CompanySectionComponent], 
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
