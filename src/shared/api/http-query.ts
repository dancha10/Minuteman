import { BASE_URL } from 'shared/config'
import { Types } from 'shared/lib'

export const login = async (email: string, password: string): Promise<string> => {
	try {
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
	} catch (e: any) {
		throw Error(e.message)
	}
}

export const getMyProfile = async (): Promise<Types.MyProfileType> => {
	const request = await fetch(`${BASE_URL}user/getUserProfile`, {
		headers: {
			authorization: localStorage.getItem('@token')!,
		},
	})
	return await request.json()
}

export const getReviews = async (): Promise<Types.ListReviewsType[]> => {
	const request = await fetch(`${BASE_URL}reviews/getAll`, {
		headers: {
			authorization: localStorage.getItem('@token')!,
		},
	})
	return await request.json()
}

export const getCaptcha = async (): Promise<Types.CaptchaType> => {
	const request = await fetch(`${BASE_URL}reviews/getCaptcha`)
	return await request.json()
}

export const createReviews = async (
	authorName: string,
	title: string,
	text: string,
	captchaKey: string,
	captchaValue: string
): Promise<any> => {
	const request = await fetch(`${BASE_URL}reviews/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			authorization: localStorage.getItem('@token')!,
		},
		body: JSON.stringify({
			authorName,
			title,
			text,
			captchaKey,
			captchaValue,
		}),
	})
	return await request.json()
}
