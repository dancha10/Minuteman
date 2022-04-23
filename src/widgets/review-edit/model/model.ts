import { createEvent, createStore, sample } from 'effector'

export const toggledOpenModal = createEvent()
export const $isOpen = createStore(false).on(toggledOpenModal, (prev, _) => !prev)

export const getCurrentReview = createEvent<string>()
export const $currentReview = createStore<string>('').on(getCurrentReview, (_, review) => review)

sample({
	clock: getCurrentReview,
	target: toggledOpenModal,
})
