export interface IButtonProps {
	type?: 'button' | 'submit' | 'reset'
	onClickHandler?: () => void
	disabled?: boolean
}

export interface IUserReview {
	fullName: string
	dateOfPost: string
	review: string
	avatar?: string
	status?: 'published' | 'unpublished' | 'rejected'
}

export interface IInput {
	placeholder: string
	disabled?: boolean
	validation?: object
	isError?: boolean
	onChange?: (value: string) => void
	defaultValue?: string
	value?: string
}

export interface OptionProps {
	option: { value: string; label: string }
}

export interface IUserInfo {
	name: string
	description: string
	status: 'studying' | 'expelled' | 'graduated'
}

export interface AuthType {
	accessToken: string
	expiresIn: number
	tokenType: string
	refreshToken: string
}

export interface MyProfileType {
	firstName: string
	lastName: string
	profileImage: string
	birthDate: string
	gender: 'male' | 'female'
	cityOfResidence: string
	favoriteFood: string | null
	hasPet: boolean
	petType: string | null
	petName: string | null
	aboutMe: string
	smallAboutMe: string | null
	academyStatus: 'studies'
}

export interface ListReviewsType {
	createdAt: string
	id: string
	version: 1
	authorImage: string | null
	authorName: string
	title: string
	text: string
	status: 'onCheck'
}

export interface CaptchaType {
	base64Image: string
	key: string
}

export interface UploadType {
	id: string
	authorImage: FormData
}
