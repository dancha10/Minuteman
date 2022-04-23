import { createEvent, createStore } from 'effector'

export const changedAuthenticated = createEvent<boolean>()
export const $isAuthenticated = createStore<boolean>(false).on(changedAuthenticated, (_, isAuth) => isAuth)
