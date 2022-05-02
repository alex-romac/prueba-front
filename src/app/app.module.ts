import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearPokemonComponent } from './pokemons/componentes/crear/crear-pokemon/crear-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    CrearPokemonComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,

    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'pokemons', component: PokemonsComponent},
      {path: '', redirectTo: 'pokemons', pathMatch: 'full'},
      {path: '**', redirectTo: 'pokemons', pathMatch: 'full'}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
