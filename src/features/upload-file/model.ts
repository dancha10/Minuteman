import { createEvent, createStore, sample } from 'effector'

export const resetStores = createEvent()

export const savedUploadImage = createEvent<string>()
export const $uploadImage = createStore<string>('')
	.on(savedUploadImage, (_, img) => img)
	.reset(resetStores)

export const $fileName = createStore<string>('').reset(resetStores)

const setErrorMessage = createEvent<string>()
export const $errorMessage = createStore<string>('')
	.on(setErrorMessage, (_, message) => message)
	.reset(resetStores)

const changedPercentLoading = createEvent<number>()
export const $percentLoading = createStore<number>(1)
	.on(changedPercentLoading, (_, percent) => percent)
	.reset(resetStores)

export const imageReader = (files: FileList | null) => {
	if (!files) return console.log('Error')
	const file = files[0]

	if (!/\.(jpe?g|png)$/i.test(file?.name)) {
		changedPercentLoading(100)
		return setErrorMessage('Разрешены: jpeg и png')
	}

	if (file.size > 1024 * 1024 * 5) {
		changedPercentLoading(100)
		return setErrorMessage('Your file is too big!')
	}
	const reader = new FileReader()
	reader.onload = () => savedUploadImage(reader.result as string)

	sample({
		clock: savedUploadImage,
		fn: () => file.name,
		target: $fileName,
	})
	reader.onloadend = () => setTimeout(() => changedPercentLoading(100), 500)
	reader.readAsDataURL(file)
}
