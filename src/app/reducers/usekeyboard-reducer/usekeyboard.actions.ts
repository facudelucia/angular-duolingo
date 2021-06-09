import { createAction, props } from '@ngrx/store'

export const use = createAction('[Keyboard] Use Keyboard',props<{ useKeyboard: boolean }>())