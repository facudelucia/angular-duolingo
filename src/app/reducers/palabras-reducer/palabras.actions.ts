import { Palabra } from '../../interfaces/stage.interface';
import { createAction, props } from '@ngrx/store'


export const crear = createAction('[Word] Crea Word', props<{ texto: Palabra }>())
export const eliminar = createAction('[Word] Eliminar Word', props<{ id: number }>())
export const deleteCompleted = createAction('[Word] Delete Completed')