import { FC } from 'react'

import { ProfileForm } from 'widgets/profile-form'

import './style.scss'

const ProfilePage: FC = () => {
	return (
		<div className='profile-page'>
			<div className='profile-page__header'>
				<h3>Обо мне</h3>
			</div>
			<ProfileForm />
		</div>
	)
}

export default ProfilePage
