import { FC } from 'react'
import { SingleValue } from 'react-select'

import { UserPagination, UserPaginationModel } from 'entities/pagination'
import { Dropdown } from 'shared/ui/atoms/dropdown'
import { Types } from 'shared/lib'

import './style.scss'

const options: { value: string; label: string }[] = [
	{ value: 'all', label: 'Все' },
	{ value: 'expelled', label: 'Отчислен' },
	{ value: 'studies', label: 'Обучается' },
	{ value: 'graduated', label: 'Закончил' },
]

const UsersPage: FC = () => {
	const onChangedDropdownOption = (status: SingleValue<Types.OptionProps['option']>) =>
		UserPaginationModel.filteredList(typeof status?.value === 'string' ? status.value : '')

	return (
		<div className='user-page'>
			<div className='user-page__header'>
				<h3>Участники</h3>
				<div className='user-page__dropdown'>
					<Dropdown options={options} onSelect={onChangedDropdownOption} />
				</div>
			</div>
			<div className='user-page__user-list user-list'>
				<div className='user-list__header'>
					<p className='user-list__name'>ИФ УЧЕНИКА</p>
					<p className='user-list__information'>КРАТКАЯ ИНФОРМАЦИЯ</p>
					<p className='user-list__status'>СТАТУС</p>
				</div>
				<div className='user-list__pagination'>
					<UserPagination rangeViewer={6} />
				</div>
			</div>
		</div>
	)
}

export default UsersPage
