import { Component } from '@angular/core';

@Component({
  selector: 'app-maps',
  standalone: false,
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  images = [
    'mercado.png',
    'src/assets/images/laboratorio.png',
    'src/assets/images/fantasia.png',
    'src/assets/images/espacial.png'
  ];

}
