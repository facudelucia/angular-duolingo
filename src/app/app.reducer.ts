import { Palabra } from './interfaces/stage.interface';
import { ActionReducerMap } from '@ngrx/store';
import * as error from './reducers/error-reducer/error.reducer';
import * as keyboard from './reducers/keyboard-reducer/keyboard.reducer';
import { palabrasReducer } from './reducers/palabras-reducer/palabras.reducer';
import * as success from './reducers/success-reducer/succes.reducer';
import * as usekey from './reducers/usekeyboard-reducer/usekeyboard.reducer';
import * as stage from './reducers/stage-reducer/stage.reducer'

export interface AppState {
    palabras: Palabra[],
    keyboard: keyboard.State,
    usekey: usekey.State,
    success: success.State,
    error: error.State,
    stage: stage.State
}

export const appReducers: ActionReducerMap<AppState> = {
    palabras: palabrasReducer,
    keyboard: keyboard.keyboardReducer,
    usekey: usekey.usekeyReducer,
    success: success.successReducer,
    error: error.errorReducer,
    stage: stage.stageReducer
}