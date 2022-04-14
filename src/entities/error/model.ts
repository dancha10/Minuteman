import { delay } from 'patronum/delay'
import { createEvent, createStore, sample } from 'effector'

const resetError = createEvent()
export const setError = createEvent<string>()
export const $errorMessage = createStore<string>('')
	.on(setError, (_, error) => error)
	.reset(resetError)

const delayedError = delay({
	source: sample({
		clock: setError,
		filter: message => !!message,
	}),
	timeout: 5000,
})

sample({
	clock: delayedError,
	target: resetError,
})
