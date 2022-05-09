import { BASE_URL } from 'shared/config'
import { Types } from 'shared/lib'

// НЕ стал оборачивать все в try/catch т.к. эффектор и без этого сможет отловить ошибку

export const login = async (email: string, password: string): Promise<string> => {
	const request = await fetch(`${BASE_URL}user/signIn`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	})
	const res = await request.json()
	if (!request.ok) throw Error(res.message)
	return res.accessToken
}

export const getMyProfile = async (): Promise<Types.MyProfileType> => {
	const request = await fetch(`${BASE_URL}user/getUserProfile`, {
		headers: {
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('@token')!)}`,
		},
	})
	return await request.json()
}

export const getReviews = async (): Promise<Types.ListReviewsType[]> => {
	const request = await fetch(`${BASE_URL}reviews/getAll`, {
		headers: {
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('@token')!)}`,
		},
	})
	const response = await request.json()
	if (!request.ok) throw Error(response.message)
	return response
}

export const getCaptcha = async (): Promise<Types.CaptchaType> => {
	const request = await fetch(`${BASE_URL}reviews/getCaptcha`)
	const response = await request.json()
	if (!request.ok) throw Error(response.message)
	return response
}

export const createReviews = async (
	authorName: string,
	title: string,
	text: string,
	captchaKey: string,
	captchaValue: string
): Promise<Types.ListReviewsType> => {
	const request = await fetch(`${BASE_URL}reviews/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('@token')!)}`,
		},
		body: JSON.stringify({
			authorName,
			title,
			text,
			captchaKey,
			captchaValue,
		}),
	})
	const response = await request.json()
	if (!request.ok) throw Error(response.message)
	return response
}

export const updatePhoto = async (id: string, body: FormData) => {
	const request = await fetch(`${BASE_URL}reviews/updatePhoto/${id}`, {
		method: 'POST',
		body,
	})
	const response = await request.json()
	if (!request.ok) throw Error(response.message)
	return response
}

export const getUsersList = async (): Promise<Types.MyProfileType[]> => {
	const request = await fetch(`${BASE_URL}user/getAll`, {
		headers: {
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('@token')!)}`,
		},
	})
	const response = await request.json()
	if (!request.ok) throw Error(response.message)
	return response
}

export const editReview = async (id: string, text: string): Promise<Types.ListReviewsType> => {
	const request = await fetch(`${BASE_URL}reviews/updateInfo/${id}`, {
		method: 'POST',
		body: JSON.stringify({
			text,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('@token')!)}`,
		},
	})
	const response = await request.json()
	if (!request.ok) throw Error(response.message)
	return response
}

export const updateStatus = async (
	id: string,
	status: Types.ListReviewsType['status']
): Promise<Types.ListReviewsType> => {
	const request = await fetch(`${BASE_URL}reviews/updateStatus/${id}`, {
		method: 'POST',
		body: JSON.stringify({
			status,
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${JSON.parse(localStorage.getItem('@token')!)}`,
		},
	})
	const response = await request.json()
	if (!request.ok) throw Error(response.message)
	return response
}
