import { createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

export const MainPageGate = createGate()

export const $isMobileWidth = createStore(document.body.offsetWidth < 768)

const resized = createEvent()

const resizeFx = createEffect(() => {
	window.addEventListener('resize', () => resized())
	return window.removeEventListener('resize', () => resized())
})

sample({
	clock: MainPageGate.open,
	target: resizeFx,
})

sample({
	clock: resized,
	fn: () => document.body.offsetWidth < 768,
	target: $isMobileWidth,
})
