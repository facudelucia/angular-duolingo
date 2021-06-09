import { createAction, props } from '@ngrx/store'

export const setError = createAction('[Error] set Error', props<{ error: boolean }>())