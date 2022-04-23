import { createEvent, createStore } from 'effector'

export const changedAuthenticated = createEvent<boolean>()
export const $isAuthenticated = createStore<boolean>(true).on(changedAuthenticated, (_, isAuth) => isAuth)
