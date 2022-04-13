import { createEffect, createEvent, createStore, split } from 'effector'

export const clickedButton = createEvent()
export const $isOpen = createStore<boolean>(false).on(clickedButton, open => !open)

const blockScrollBodyFx = createEffect<void, void, Error>(() => {
	document.body.style.overflow = 'hidden'
})

const allowScrollBodyFx = createEffect<void, void, Error>(() => {
	document.body.style.overflow = ''
})

split({
	source: $isOpen,
	match: {
		block: state => state,
		allow: state => !state,
	},
	cases: {
		block: blockScrollBodyFx,
		allow: allowScrollBodyFx,
	},
})
