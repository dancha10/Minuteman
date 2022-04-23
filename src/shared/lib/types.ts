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
	isError: boolean
}

export interface OptionProps {
	option: { value: string; label: string }
}
