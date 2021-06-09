import { Stage, Palabra } from '../../interfaces/stage.interface';
import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as palabrasActions from '../../reducers/palabras-reducer/palabras.actions'
import * as keyboardActions from '../../reducers/keyboard-reducer/keyboard.actions'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {
  prueba!: number
  useKey!: boolean
  palabrasArray1: Palabra[] = []
  palabrasArray2: Palabra[] = []
  pruebas: Stage[] = []

  miFormulario: FormGroup = this.fb.group({
    busqueda: ['']
  })

  constructor(private store: Store<AppState>, private fb: FormBuilder, private dataService: DataService) { }
  ngOnInit(): void {
    this.dataService.getJSON()
      .subscribe((res: Stage[]) => {
        this.pruebas = res
      })
    this.store.select('stage')
      .subscribe(res => {
        this.prueba = res.stage
      })
    this.store.select('palabras')
      .subscribe((res: Palabra[]) => {
        this.palabrasArray1 = res.slice(0, 5)
        this.palabrasArray2 = res.slice(5, 10)
      })
    this.store.select('usekey')
      .subscribe(res => {
        this.useKey = res.useKeyboard
        if (!res.useKeyboard) {
          this.miFormulario.reset()
        }
      })
    this.store.select('keyboard')
      .subscribe(res => {
        if (res.texto === "") {
          this.miFormulario.reset()
        }
      })
  }

  selectPalabra(palabra: Palabra): void {
    this.pruebas[this.prueba].palabras = this.pruebas[this.prueba].palabras.filter((item: Palabra) => item.id !== palabra.id)
    this.store.dispatch(palabrasActions.crear({ texto: palabra }))
  }

  eliminar(palabra: Palabra): void {
    this.store.dispatch(palabrasActions.eliminar({ id: palabra.id }))
    this.pruebas[this.prueba].palabras.push(palabra)
    this.pruebas[this.prueba].palabras.sort((a: Palabra, b: Palabra) => a.id - b.id)
  }

  busquedaR(): void {
    this.store.dispatch(keyboardActions.add({ texto: this.miFormulario.get('busqueda')?.value }))
  }

}
