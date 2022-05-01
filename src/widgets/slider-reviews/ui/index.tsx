import { FC, useEffect, useRef } from 'react'
import { useList, useStore } from 'effector-react'
import Slider from 'react-slick'

import { ToggleModel } from 'features/toggle-modal'
import { Button } from 'shared/ui/atoms/button'
import { UserComment } from 'shared/ui/molecules/user-comment'
import { ArrowSlider } from 'shared/ui/atoms/arrow'
import { $isMobileWidth, localeDateString } from 'shared/lib'

import { $userReviews, getSliderReviews } from '../model'

import './style.scss'

export const SliderReviews: FC = () => {
	const isMobileWidth = useStore($isMobileWidth)
	const sliderRef = useRef<Slider>(null)
	const UserReviewsList = useList($userReviews, ({ authorImage, authorName, text, createdAt }) => (
		<UserComment
			review={text}
			name={authorName}
			dateOfPost={localeDateString(createdAt)}
			image={authorImage ? `https://academtest.ilink.dev/images/${authorImage}` : null}
		/>
	))
	const nextSlide = () => {
		sliderRef.current?.slickNext()
	}
	const prevSlide = () => {
		sliderRef.current?.slickPrev()
	}

	useEffect(() => {
		getSliderReviews()
	}, [])

	return (
		<div className='slider-review'>
			<div className='slider-review__header'>
				<h2>Отзывы</h2>
				<Button.Dark onClickHandler={ToggleModel.clickedButton} addition>
					{!isMobileWidth && 'Добавить отзыв'}
				</Button.Dark>
			</div>
			<div className='slider-review__list-reviews'>
				<Slider
					dots
					infinite
					speed={500}
					slidesToScroll={1}
					slidesToShow={2}
					accessibility
					arrows={false}
					adaptiveHeight
					ref={sliderRef}
					dotsClass='slider-review__dots'
					responsive={[
						{
							breakpoint: 479.98,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
							},
						},
					]}
				>
					{UserReviewsList}
				</Slider>
			</div>
			<div className='slider-review__button-area'>
				<ArrowSlider rotate={180} onClick={prevSlide} />
				<ArrowSlider onClick={nextSlide} />
			</div>
		</div>
	)
}
