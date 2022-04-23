import { FC, useState } from 'react'

import { Pagination } from 'widgets/pagination'
import { Dropdown } from 'shared/ui/atoms/dropdown'

import './style.scss'

const options: { value: string; label: string }[] = [
	{ value: 'all', label: 'Все' },
	{ value: 'expelled', label: 'Отчислен' },
	{ value: 'studying', label: 'Обучается' },
	{ value: 'graduated', label: 'Закончил' },
]

type userType = {
	name: string
	description: string
	status: 'studying' | 'expelled' | 'graduated'
}
const users: userType[] = [
	{
		name: 'Акакий Акакиевич',
		description: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
		status: 'studying',
	},
	{
		name: 'Акакий Акакиевич',
		description: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
		status: 'expelled',
	},
	{
		name: 'Акакий Акакиевич',
		description: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
		status: 'expelled',
	},
	{
		name: 'Акакий Акакиевич',
		description: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
		status: 'graduated',
	},
	{
		name: 'Акакий Акакиевич',
		description: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
		status: 'studying',
	},
	{
		name: 'Акакий Акакиевич',
		description: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
		status: 'studying',
	},
	{
		name: 'Акакий Акакиевич',
		description: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
		status: 'studying',
	},
	{
		name: 'Акакий Акакиевич',
		description: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
		status: 'studying',
	},
]

const UsersPage: FC = () => {
	const [status, setStatus] = useState<string>('all')
	const onChangedDropdownOption = (props: string) => setStatus(props)

	return (
		<div className='user-page'>
			<div className='user-page__header'>
				<h3>Участники</h3>
				<div className='user-page__dropdown'>
					<Dropdown options={options} onChanged={onChangedDropdownOption} />
				</div>
			</div>
			<div className='user-page__user-list user-list'>
				<div className='user-list__header'>
					<p className='user-list__name'>ИФ УЧЕНИКА</p>
					<p className='user-list__information'>КРАТКАЯ ИНФОРМАЦИЯ</p>
					<p className='user-list__status'>СТАТУС</p>
				</div>
				<div className='user-list__list'>
					<Pagination list={users} rangeViewer={6} filterSign={status} />
				</div>
			</div>
		</div>
	)
}

export default UsersPage
