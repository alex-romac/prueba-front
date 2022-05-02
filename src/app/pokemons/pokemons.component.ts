import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from './interfaces/pokemon';
import { PokemonService } from './servicio/pokemon.service';


@Component({
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit, OnDestroy {

  titulo = 'Listado de Pokemon';
  pokemons: Pokemon [] = [];
  listaPokemons: Pokemon [] = [];
  msjError: string = '';
  msjExito: string = '';
  susc!: Subscription;
  pokemonSeleccionado: Pokemon | undefined;
  
  constructor(private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.obtenerPokemons();
  }
 

  set criterio(filtro: string) {
     this.listaPokemons = this.pokemons.filter(( pk: Pokemon) => 
       pk.name.toLocaleUpperCase().includes(filtro.toLocaleUpperCase())
     );
     this.msjExito = '';
  }

  obtenerPokemons() {
    this.susc = this._pokemonService.obtenerPokemons().subscribe({
      next: pokemons => {
        this.pokemons = pokemons;
        this.listaPokemons = this.pokemons;
      },
      error: err => this.msjError = err
    })
  }

  eliminarPokemon(id: number): void {
    this.susc = this._pokemonService.eliminarPokemon(id).subscribe({
      next: pk => {
        this.msjExito = `El pokemon ${pk.name} ha sido eliminado`;
        this.obtenerPokemons();
      },
      error: err => this.msjError = err
    })
  }

  editarPokemon(pk: Pokemon) {
      this.pokemonSeleccionado = pk;
  }

  nuevoPokemon() {
    this.pokemonSeleccionado = undefined;
  }

  ngOnDestroy(): void {
    this.susc.unsubscribe();
  }

  onBotonClicked(esClick: boolean) {
    if(esClick) {
      this.obtenerPokemons();
    }
  }
}
