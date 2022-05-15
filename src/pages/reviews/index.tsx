import { FC, useEffect } from 'react'
import { SingleValue } from 'react-select'

import { Dropdown } from 'shared/ui/atoms/dropdown'
import { ReviewList, ReviewListModel } from 'widgets/review-list'
import { Types } from 'shared/lib'

import './style.scss'

const options: { value: string; label: string }[] = [
	{ value: 'onCheck', label: 'Сначала неопубликованные' },
	{ value: 'declined', label: 'Сначала отклоненные' },
	{ value: 'approved', label: 'Сначала опубликованные' },
]

const ReviewsPage: FC = () => {
	useEffect(() => {
		ReviewListModel.changedFilterStatus('unpublished')
	}, [])

	const onChangedDropdownOption = (status: SingleValue<Types.OptionProps['option']>) => {
		ReviewListModel.changedFilterStatus(typeof status?.value === 'string' ? status.value : '')
	}

	return (
		<div className='reviews-page'>
			<div className='reviews-page__header'>
				<h3>Отзывы</h3>
				<div className='reviews-page__dropdown'>
					<Dropdown options={options} onSelect={onChangedDropdownOption} />
				</div>
			</div>
			<div className='reviews-page__reviews-area'>
				<ReviewList />
			</div>
		</div>
	)
}

export default ReviewsPage
