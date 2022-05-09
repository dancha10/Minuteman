import { FC, useEffect } from 'react'

import { Dropdown } from 'shared/ui/atoms/dropdown'
import { ReviewList, ReviewListModel } from 'widgets/review-list'

import './style.scss'

const options: { value: string; label: string }[] = [
	{ value: 'unpublished', label: 'Сначала неопубликованные' },
	{ value: 'rejected', label: 'Сначала отклоненные' },
	{ value: 'published', label: 'Сначала опубликованные' },
]

const ReviewsPage: FC = () => {
	useEffect(() => {
		ReviewListModel.changedFilterStatus('unpublished')
	}, [])

	const onChangedDropdownOption = (status: string) => ReviewListModel.changedFilterStatus(status)

	return (
		<div className='reviews-page'>
			<div className='reviews-page__header'>
				<h3>Отзывы</h3>
				<div className='reviews-page__dropdown'>
					<Dropdown options={options} onChanged={onChangedDropdownOption} />
				</div>
			</div>
			<div className='reviews-page__reviews-area'>
				<ReviewList />
			</div>
		</div>
	)
}

export default ReviewsPage
