import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TomeService } from '../services/tome.service';
import { ConceptService } from '../services/concept.service';
import { Tome } from '../models/Tome';
import { Concept } from '../models/Concept';
import {TomesReviewedService} from '../services/tomes-reviewed.service';
import {PlayerTomesReviewed} from '../models/PlayerTomesReviewed';

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
  profileId!: number;
  playerId!: number; // <-- Si luego deseas integrarlo

  readConceptIds: Set<number> = new Set();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tomeService: TomeService,
    private conceptService: ConceptService,
    private tomesReviewedService: TomesReviewedService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.levelId = +params['levelId'];
      console.log('✅ levelId recibido correctamente:', this.levelId);

      const storedProfileId = localStorage.getItem('profileId');
      if (!storedProfileId) {
        console.error('❌ No se encontró el profileId en localStorage.');
        this.router.navigate(['/login']);
        return;
      }

      this.profileId = +storedProfileId;
      console.log('🧾 profileId cargado desde localStorage:', this.profileId);

      this.loadTomeAndConcepts(this.levelId);
    });
  }

  loadTomeAndConcepts(levelId: number): void {
    this.tomeService.getByLevelId(levelId).subscribe({
      next: tomes => {
        if (!tomes || tomes.length === 0) {
          console.error('❌ No se encontró ningún tome para el levelId:', levelId);
          return;
        }

        this.tome = tomes[0];
        console.log('📘 Tome recibido:', this.tome);

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

      const conceptIndex = this.currentCard - 1;
      if (conceptIndex >= 0 && conceptIndex < this.concepts.length) {
        const conceptId = this.concepts[conceptIndex].id;
        if (!this.readConceptIds.has(conceptId)) {
          const data: PlayerTomesReviewed = {
            playerId: this.profileId, // usa profileId por ahora (ajustar si se agrega playerId)
            conceptId: conceptId
          };

          console.log('📤 Enviando registro de lectura:', data);

          this.tomesReviewedService.markAsRead(data).subscribe({
            next: () => {
              console.log(`✅ Concepto ${conceptId} marcado como leído`);
              this.readConceptIds.add(conceptId);
            },
            error: err => {
              console.error(`❌ Error al marcar como leído el concepto ${conceptId}`, err);
            }
          });
        }
      }
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
