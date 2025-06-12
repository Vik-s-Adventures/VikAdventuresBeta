import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TomeService } from '../services/tome.service';
import { ConceptService } from '../services/concept.service';
import { Tome } from '../models/Tome';
import { Concept } from '../models/Concept';
import {environment} from '../../../../shared/environments/environment.development';

@Component({
  selector: 'app-one-performance-concepts',
  standalone: false,
  templateUrl: './one-performance-concepts.component.html',
  styleUrl: './one-performance-concepts.component.css'
})
export class OnePerformanceConceptsComponent implements OnInit {
  currentCard = 0;
  levelId!: number;
  tome!: Tome;
  concepts: Concept[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tomeService: TomeService,
    private conceptService: ConceptService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.levelId = +params['levelId'];

      console.log('✅ levelId recibido correctamente:', this.levelId);

      this.loadTomeAndConcepts(this.levelId);
    });
  }

  loadTomeAndConcepts(levelId: number): void {
    const tomeUrl = `${environment.serverBasePath}/tomes/level/${levelId}`;
    console.log('📥 Request URL:', tomeUrl);

    this.tomeService.getByLevelId(levelId).subscribe({
      next: tomes => {
        if (!tomes || tomes.length === 0) {
          console.error('❌ No se encontró ningún tome para el levelId:', levelId);
          return;
        }

        this.tome = tomes[0]; // ✅ toma el primero del arreglo
        console.log('📘 Tome recibido:', this.tome);

        const conceptUrl = `${environment.serverBasePath}/concepts/tome/${this.tome.id}`;
        console.log('📥 Request URL para concepts:', conceptUrl);

        this.conceptService.getByTomeId(this.tome.id).subscribe({
          next: concepts => {
            this.concepts = concepts;
            console.log('📚 Concepts recibidos:', concepts);
          },
          error: err => console.error('❌ Error al cargar concepts:', err)
        });
      },
      error: err => console.error('❌ Error al cargar tome:', err)
    });
  }


  nextCard(): void {
    if (this.currentCard < this.concepts.length + 2) {
      this.currentCard++;
    }
  }

  previousCard(): void {
    if (this.currentCard > 0) {
      this.currentCard--;
    }
  }

  goToRemember(): void {
    this.router.navigate(['/d1-one-practice', this.levelId]);
  }

  navigateToComponent1(): void {
    this.router.navigate(['/menu']);
  }

  navigateToComponent2(): void {
    this.router.navigate(['/learning-path']);
  }
}
