import { createReducer, on } from '@ngrx/store'
import { avanzarStage, reiniciarStage } from './stage.actions'

export interface State {
    stage: number
}

const initialState: State = {
    stage: 0
}

const _stageReducer = createReducer(initialState,
    on(avanzarStage, (state) => ({ ...state, stage: state.stage + 1 })),
    on(reiniciarStage, (state) => ({...state, stage: 0}))    
)

export function stageReducer(state: any, action: any) {
    return _stageReducer(state, action)
}