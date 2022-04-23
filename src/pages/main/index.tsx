import { FC } from 'react'
import { useGate } from 'effector-react'

import { Header } from 'shared/ui/organisms/header'
import { Footer } from 'shared/ui/organisms/footer'
import { ReviewModel } from 'widgets/review-modal'
import { SliderReviews } from 'widgets/slider-reviews'
import { NotificationWrapper } from 'entities/notification'
import { Avatar } from 'shared/ui/atoms/avatar'
import { UserCard } from 'entities/user-card'
import { MainPageGate } from 'shared/lib'

import './style.scss'

const MainPage: FC = () => {
	useGate(MainPageGate)
	return (
		<div className='main-page'>
			<Header type='primary' />
			<main className='main-page__container container'>
				<h1 className='main-page__welcome'>Добро пожаловать в академию!</h1>
				<div className='main-page__user-preview'>
					<Avatar image='https://sun9-36.userapi.com/impf/c849332/v849332182/d8a7e/SzEtiqLuErs.jpg?size=960x1280&quality=96&sign=4ae6bc474b03e1683da4b35cf31ac851&type=album' />
					<div className='preview__card'>
						<UserCard
							fullName='Даниил Абраменко'
							yearBirth='10.08.2001'
							city='Томск'
							sex='male'
							byTheWay='Сильный не тот кто в качалке качался, а тот кто упал и отжался'
							pets
							description={
								"Всем привет! Меня зовут Даниил, мне 20 лет, я студент. Учусь на программиста, в таком ВУЗе, как ТУСУР. Живу пока что в крутой общаге. Как и многие другие хочу стать сеньером-помидором frontend developer'om."
							}
						/>
					</div>
				</div>
			</main>
			<div className='main-page__reviews'>
				<SliderReviews />
			</div>
			<ReviewModel />
			<NotificationWrapper />
			<Footer />
		</div>
	)
}

export default MainPage
