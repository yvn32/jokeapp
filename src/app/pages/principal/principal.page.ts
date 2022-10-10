import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  msje1: string = '';
  msje2: string = '';


  constructor(private router: Router) { }

  ngOnInit() {
    this.nombre = this.router.getCurrentNavigation().extras.state.nombre;
    this.apellido = this.router.getCurrentNavigation().extras.state.apellido;
    this.msje1 = '¿Qué tal otro chiste, ';
    this.msje2 = '?'

  }



}
