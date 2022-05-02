import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPokemonComponent } from './crear-pokemon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('CrearPokemonComponent', () => {
  let component: CrearPokemonComponent;
  let fixture: ComponentFixture<CrearPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPokemonComponent ], imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Debe validar formulario invalido', () => {
    const formCrear = component.form;
    const name = component.form.controls['nombre'];
    name.setValue('nombre de prueba'); 
    expect(formCrear.invalid).toBeTrue();
  });

  it('Debe validar formulario valido', () => {
    const formCrear = component.form;
    const name = component.form.controls['nombre'];
    const imagen = component.form.controls['imagen'];
    const ataque = component.form.controls['ataque'];
    const defensa = component.form.controls['defensa'];
    name.setValue('nombre de prueba'); 
    imagen.setValue('url de prueba'); 
    ataque.setValue(100); 
    defensa.setValue(55); 
    expect(formCrear.valid).toBeTrue();
  });

  it('Debe validar que la variable valido se actualice cuando el formulario es correcto', () => {
    const formCrear = component.form;
    const name = component.form.controls['nombre'];
    const imagen = component.form.controls['imagen'];
    const ataque = component.form.controls['ataque'];
    const defensa = component.form.controls['defensa'];
    name.setValue('nombre de prueba2'); 
    imagen.setValue('url de prueba2'); 
    ataque.setValue(77); 
    defensa.setValue(22);
    expect(component.valido).toEqual(true);
  });

});
