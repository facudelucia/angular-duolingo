import { createReducer, on } from '@ngrx/store'
import { use } from './usekeyboard.actions'

export interface State {
    useKeyboard: boolean
}

const initialState: State = {
    useKeyboard: false
}

const _usekeyReducer = createReducer(initialState,
    on(use, (state, { useKeyboard }: any) => ({ ...state, useKeyboard: useKeyboard })),

)

export function usekeyReducer(state: any, action: any) {
    return _usekeyReducer(state, action)
}