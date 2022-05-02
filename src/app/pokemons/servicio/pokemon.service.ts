import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators'
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons/?idAuthor=1';
  private pokemonPutDeleteUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons/';

  constructor(private _httpClient: HttpClient) { }

  obtenerPokemons(): Observable<Pokemon []> {
    return this._httpClient.get<Pokemon []>(this.pokemonUrl).pipe(
      tap(data => console.debug('debug', JSON.stringify(data)),
      catchError(this.manejoExcepcion))
    )
  }

  eliminarPokemon(idPokemon: number): Observable<Pokemon> {
    return this._httpClient.delete<Pokemon>(this.pokemonPutDeleteUrl + idPokemon).pipe(
      tap(data => console.log('debug', JSON.stringify(data)),
      catchError(this.manejoExcepcion))
    )
  }

  crearPokemon(pok: Pokemon): Observable<Pokemon> {
    return this._httpClient.post<Pokemon>(this.pokemonUrl, pok).pipe(
      tap(data => console.log('debug', JSON.stringify(data)),
      catchError(this.manejoExcepcion))
    )
  }

  editarPokemon(pok: Pokemon): Observable<Pokemon> {
    return this._httpClient.put<Pokemon>(this.pokemonPutDeleteUrl + pok.id, pok).pipe(
      tap(data => console.log('debug', JSON.stringify(data)),
      catchError(this.manejoExcepcion))
    )
  }

  private manejoExcepcion(err: HttpErrorResponse): Observable<never> {
    let msjError = '';
    if (err.error instanceof ErrorEvent) {
      msjError = `Error: ${err.error.message}`;
    } else {
      msjError = `Codigo de error: ${err.status}: ${err.message}`;
    }
    console.error(msjError);
    return throwError(msjError);
  }
}
