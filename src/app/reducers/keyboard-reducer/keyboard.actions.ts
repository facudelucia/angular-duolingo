import { createAction, props } from '@ngrx/store'

export const add = createAction('[Keyboard] add Word', props<{ texto: string }>())
export const deleteAll = createAction('[Keyboard] Delete Completed')