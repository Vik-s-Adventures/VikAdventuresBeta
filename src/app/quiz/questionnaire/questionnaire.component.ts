import {Component, OnInit} from '@angular/core';
import {Question} from '../model/Question';
import {Option} from '../model/Option';
import {Router} from '@angular/router';
import {QuestionService} from '../services/question.service';
import {StudentResponseService} from '../services/student-response.service';
import {OptionService} from '../services/option.service';
import {Student} from '../../profile/model/Student';
import {StudentService} from '../../profile/services/student.service';

@Component({
  selector: 'app-questionnaire',
  standalone: false,
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css'
})
export class QuestionnaireComponent implements OnInit {
  questions: Question[] = [];
  answerOptions: Option[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion!: Question;
  selectedAnswer: Option | null = null;
  currentStudent!: Student;  // Objeto de estudiante actual, que debe ser asignado
  responses: Response[] = [];  // Array para almacenar respuestas
  private student: Student | undefined;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private optionService: OptionService,
    private responseService: StudentResponseService, // Servicio nuevo para manejar las respuestas
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.loadAnswerOptions();
    this.loadCurrentStudent();
    // Cargar el estudiante actual
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        this.currentQuestion = this.questions[this.currentQuestionIndex]; // Mostrar la primera pregunta
      },
      error: (error) => {
        console.error('Error al cargar las preguntas', error);
      }
    });
  }

  loadAnswerOptions(): void {
    // @ts-ignore
    this.optionService.getAnswerQuestions().subscribe({
      complete(): void {
      },
      next: (data: Option[]) => {
        this.answerOptions = data;
      },
      error: (error) => {
        console.error('Error al cargar las opciones de respuesta', error);
      }
    });
  }

  // Método para obtener las respuestas filtradas por el ID de la pregunta
  getOptionsByQuestionId(questionId: number): Option[] {
    return this.answerOptions.filter(option => option.questionId === questionId);
  }

  // Cargar el estudiante actual (esto puede ser desde un servicio o localStorage)
  loadCurrentStudent(): void {
    // Simulando la carga del estudiante actual (esto dependerá de tu lógica)
    this.currentStudent = {
      id: 16,
      firstName: 'Romina',
      lastName: 'Lourdes',
      birthDate: '17/04/2003',
      sex: 'F',
      gradeLevel: 1,
      school: 'IE Faz',
      department: 'Lima',
      province: 'Lima',
      district: 'Villa Maria del Triunfo'
    };
  }

  nextQuestion(): void {
    if (this.selectedAnswer && this.currentStudent) {
      // @ts-ignore
      const newResponse: Response = {
        id: 0,  // O el valor que sea asignado por tu backend si es generado automáticamente
        studentId: Number(this.currentStudent.id), // Asegúrate de que es un número
        optionId: Number(this.selectedAnswer.id)   // Asegúrate de que es un número
      };

      // Guardar la respuesta en el backend
      // @ts-ignore
      this.responseService.saveResponse(newResponse).subscribe({
        next: (response) => {
          console.log('Respuesta guardada exitosamente', response);
          //this.responses.push(newResponse);  // Almacenar la respuesta en el array localmente
        },
        error: (error) => {
          console.error('Error al guardar la respuesta', error);
        }
      });

      this.selectedAnswer = null; // Resetear la selección
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      }
      else {
        alert('Has completado el cuestionario');
        this.router.navigate(['/result']);  // Navegar al resultado
      }
    }

  }
}

