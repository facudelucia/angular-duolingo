import { createAction, props } from '@ngrx/store'

export const setSuccess = createAction('[Success] set Success', props<{ success: boolean }>())