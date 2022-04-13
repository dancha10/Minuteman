import { createEvent, createStore, sample } from 'effector'
import { debounce } from 'patronum/debounce'

export interface INotification {
	type: 'success' | 'error'
}

export const notificationClosed = createEvent<boolean>()
export const $isActiveNotification = createStore(false).on(notificationClosed, (_, state) => state)

export const resetTypeNotify = createEvent()
export const setTypeNotify = createEvent<INotification['type']>()
export const $typeNotify = createStore<Array<INotification['type']>>([])
	.on(setTypeNotify, (array, notify) => [notify])
	.reset(resetTypeNotify)

export const debouncedResetArray = debounce({
	source: sample({
		clock: notificationClosed,
		filter: isClose => isClose,
	}),
	timeout: 300,
})

sample({
	clock: debouncedResetArray,
	target: resetTypeNotify,
})

sample({
	clock: resetTypeNotify,
	fn: () => false,
	target: notificationClosed,
})

export const debouncedAutoClose = debounce({
	source: setTypeNotify,
	timeout: 5000,
})

sample({
	clock: debouncedAutoClose,
	fn: () => true,
	target: notificationClosed,
})
