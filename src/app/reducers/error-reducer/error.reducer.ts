import { createReducer, on } from '@ngrx/store'
import { setError } from './error.actions'


export interface State {
    error: boolean
}
const initialState: State = {
    error: false
}


const _errorReducer = createReducer(initialState,
    on(setError, (state, { error }) => ({ ...state, error: error })),
)

export function errorReducer(state: any, action: any) {
    return _errorReducer(state, action)
}