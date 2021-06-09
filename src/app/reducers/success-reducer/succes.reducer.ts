import { createReducer, on } from '@ngrx/store'
import { setSuccess } from './success.actions'


export interface State {
    success: boolean
}

const initialState: State = {
    success: false
}


const _successReducer = createReducer(initialState,
    on(setSuccess, (state, { success }: any) => ({ ...state, success: success })),
)

export function successReducer(state: any, action: any) {
    return _successReducer(state, action)
}