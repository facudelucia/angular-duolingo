import { DataService } from './../../services/data.service';
import { avanzarStage, reiniciarStage } from './../../reducers/stage-reducer/stage.actions';
import { setSuccess } from './../../reducers/success-reducer/success.actions';
import { Palabra, Stage } from './../../interfaces/stage.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { use } from 'src/app/reducers/usekeyboard-reducer/usekeyboard.actions';
import { deleteAll } from 'src/app/reducers/keyboard-reducer/keyboard.actions';
import { setError } from 'src/app/reducers/error-reducer/error.actions';
import { deleteCompleted } from 'src/app/reducers/palabras-reducer/palabras.actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {
  stage!: number
  palabrasArr!: Palabra[]
  palabrasKeyb!: string
  useKeyb: boolean = false
  setSuccess: boolean = false
  setError: boolean = false
  pruebas: Stage[] = []

  @Output() ganaste: EventEmitter<boolean> = new EventEmitter<boolean>();

  get pruebaActual(): Stage {
    return this.pruebas[this.stage]
  }

  get existsValue(): boolean {
    if (this.useKeyb) {
      if (this.palabrasKeyb === "") {
        return false
      } else {
        return true
      }
    } else {
      if (this.palabrasArr.length === 0) {
        return false
      } else {
        return true
      }
    }
  }

  constructor(private store: Store<AppState>, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getJSON().subscribe((res: Stage[]) => {
      this.pruebas = res
    })
    this.store.select('stage')
      .subscribe(res => {
        this.stage = res.stage
      })
    this.store.select('palabras')
      .subscribe((res: Palabra[]) => {
        this.palabrasArr = res
      })
    this.store.select('keyboard')
      .subscribe(res => {
        this.palabrasKeyb = res.texto
      })
    this.store.select('usekey')
      .subscribe(res => {
        this.useKeyb = res.useKeyboard
      })
    this.store.select('success')
      .subscribe(res => {
        this.setSuccess = res.success
      })
    this.store.select('error')
      .subscribe(res => {
        this.setError = res.error
      })
  }

  useKeyboard(): void {
    this.store.dispatch(use({ useKeyboard: true }))
    if (!this.useKeyb) {
      this.store.dispatch(deleteAll())
    }
  }

  useWords(): void {
    this.store.dispatch(use({ useKeyboard: false }))
    if (!this.useKeyb) {
      this.store.dispatch(deleteAll())
    }
  }

  comprobar(): void {
    const palabrasArr: string[] = this.palabrasArr.map((item: Palabra) => item.palabra)
    const palabrasStr: string = palabrasArr.join('').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    const palabraActual: string = this.pruebaActual.textoEspañol.replace(/\s/g, '').toLowerCase()
    const palabraKeyboard: string = this.palabrasKeyb.replace(/\s/g, '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\?/g, '')
    if (this.useKeyb) {
      if (palabraActual === palabraKeyboard) {
        this.store.dispatch(setSuccess({ success: true }))
      } else {
        this.store.dispatch(setError({ error: true }))
      }
    } else {
      if (palabraActual === palabrasStr) {
        this.store.dispatch(setSuccess({ success: true }))
      } else {
        this.store.dispatch(setError({ error: true }))
      }
    }

  }

  avanzar(): void {
    this.store.dispatch(avanzarStage())
    this.store.dispatch(setSuccess({ success: false }))
    if (this.stage === 4) {
      this.store.dispatch(deleteCompleted())
      this.store.dispatch(deleteAll())
      this.ganaste.emit(true)
      setTimeout(() => {
        this.store.dispatch(reiniciarStage())
      }, 1500);
      return
    }
    this.ganaste.emit(false)
    this.store.dispatch(deleteCompleted())
    this.store.dispatch(deleteAll())
  }

  reintentar(): void {
    this.store.dispatch(setError({ error: false }))
  }
}
