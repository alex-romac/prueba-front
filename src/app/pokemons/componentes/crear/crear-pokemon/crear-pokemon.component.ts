import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pokemon } from '../../../interfaces/pokemon';
import { PokemonService } from '../../../servicio/pokemon.service';

@Component({
  selector: 'bp-crear-pokemon',
  templateUrl: './crear-pokemon.component.html',
  styleUrls: ['./crear-pokemon.component.css']
})
export class CrearPokemonComponent implements OnInit, OnChanges {
  @Input() pokemonEditar: Pokemon | undefined;
  public form!: FormGroup;
  valido = false;
  msjExito = '';
  msjError: string = '';
  @Output() botonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _formBuilder: FormBuilder, private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this._nuevoForm();
  }

  private _nuevoForm() {
    this.form = this._formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(100)]],
      imagen: [null, [Validators.required, Validators.maxLength(500)]],
      ataque: [null, [Validators.required]],
      defensa: [null, [Validators.required]]
    });

    this.form.statusChanges.subscribe(estado=>{
      if(estado === 'VALID') {
        this.valido=true;
      } else {
        this.valido = false;
      }
  })
  }

  crearPokemon() {
    if (this.pokemonEditar) {
      this.pokemonEditar.name = this.form.get('nombre')!.value;
      this.pokemonEditar.image = this.form.get('imagen')!.value;
      this.pokemonEditar.attack = this.form.get('ataque')!.value;
      this.pokemonEditar.defense = this.form.get('defensa')!.value;
      this._editarPokemon(this.pokemonEditar);
    } else {
      const pokemon: Pokemon ={
        id: 0,
        hp: 0,
        idAuthor: 1,
        type: "fire",
        name: this.form.get('nombre')!.value,
        image: this.form.get('imagen')!.value,
        attack: this.form.get('ataque')!.value,
        defense: this.form.get('defensa')!.value
      };
   
      this._pokemonService.crearPokemon(pokemon).subscribe({
        next: pk => {
          this.msjExito = `Se ha creado exitosamente: ${pk.name}`;
          this._inicializar();
        },
        error: err => this.msjError = err
      })
    }
    
  }

  private _editarPokemon(pok: Pokemon): void {
    this._pokemonService.editarPokemon(pok).subscribe({
      next: pk => {
        this.msjExito = `Se ha editado exitosamente: ${pk.name}`;
        this._inicializar();
      },
      error: err => this.msjError = err
    })
  }

  private _inicializar() {
    this.valido = false;
    this.form.patchValue({nombre: null, imagen:null, ataque: null, defensa:null},{emitEvent:false});
    this.botonClicked.emit(true);
    this.pokemonEditar = undefined;
  }

  ngOnChanges(): void {
    if (this.pokemonEditar) {
      this.form.get('nombre')!.patchValue(this.pokemonEditar.name);
      this.form.get('imagen')!.patchValue(this.pokemonEditar.image);
      this.form.get('ataque')!.patchValue(this.pokemonEditar.attack);
      this.form.get('defensa')!.patchValue(this.pokemonEditar.defense);
    } else {
      this._nuevoForm();
    }
  }

}
