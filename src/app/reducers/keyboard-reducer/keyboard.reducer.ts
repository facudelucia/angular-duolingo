import { createReducer, on } from '@ngrx/store';
import { add, deleteAll } from './keyboard.actions'

export interface State {
    texto: string
}


const initialState: State = {
    texto: ""
}

const _keyboardReducer = createReducer(initialState,
    on(add, (state, { texto }) => ({ ...state, texto: texto })),
    on(deleteAll, (state) => ({ ...state, texto: "" }))
)
export function keyboardReducer(state: any, action: any) {
    return _keyboardReducer(state, action)
}