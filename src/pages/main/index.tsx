import { FC, useEffect } from 'react'
import { useGate, useStore } from 'effector-react'

import { Header } from 'shared/ui/organisms/header'
import { Footer } from 'shared/ui/organisms/footer'
import { ReviewModal } from 'widgets/review-modal'
import { SliderReviews } from 'widgets/slider-reviews'
import { NotificationWrapper } from 'entities/notification'
import { Avatar } from 'shared/ui/atoms/avatar'
import { UserCard, UserCardModel } from 'entities/user-card'
import { localeDateString, MainPageGate } from 'shared/lib'

import './style.scss'

const MainPage: FC = () => {
	useGate(MainPageGate)

	const profileFields = useStore(UserCardModel.$profileInfo)

	return (
		<div className='main-page'>
			<Header type='primary' />
			<main className='main-page__container container'>
				<h1 className='main-page__welcome'>Добро пожаловать в академию!</h1>
				<div className='main-page__user-preview'>
					<Avatar image={`https://academtest.ilink.dev/images/${profileFields?.profileImage}`} />
					<div className='preview__card'>
						<UserCard
							fullName={`${profileFields?.firstName} ${profileFields?.lastName}`}
							yearBirth={localeDateString(new Date(profileFields?.birthDate!).toLocaleDateString())}
							city={profileFields?.cityOfResidence}
							sex={profileFields?.gender}
							pets={profileFields?.hasPet}
							description={profileFields?.aboutMe}
						/>
					</div>
				</div>
			</main>
			<div className='main-page__reviews'>
				<SliderReviews />
			</div>
			<ReviewModal />
			<NotificationWrapper />
			<Footer />
		</div>
	)
}

export default MainPage
