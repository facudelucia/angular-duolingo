import { Palabra } from '../../interfaces/stage.interface';
import { createReducer, on } from '@ngrx/store'
import { crear, eliminar, deleteCompleted } from './palabras.actions'

const initialState: Palabra[] = []

const _palabrasReducer = createReducer(initialState,
    on(crear, (state, { texto }) => [...state, texto]),
    on(eliminar, (state, { id }) => state.filter((item: Palabra) => item.id !== id)),
    on(deleteCompleted, (state) => [])
)

export function palabrasReducer(state: any, action: any) {
    return _palabrasReducer(state, action)
}