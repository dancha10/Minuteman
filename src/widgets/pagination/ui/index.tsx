import { FC, useEffect } from 'react'
import { useStore } from 'effector-react'

import { UserList } from 'shared/ui/organisms/user-list'
import { PaginationList } from 'entities/pagination'

import { $filteredUserList, filteredList } from '../model'

interface IPagination {
	rangeViewer: number
	filterSign: string
}

export const Pagination: FC<IPagination> = ({ rangeViewer, filterSign }) => {
	const userList = useStore($filteredUserList)

	useEffect(() => {
		filteredList(filterSign)
	}, [filterSign])

	return (
		<div className='pagination'>
			<PaginationList rangeViewer={rangeViewer}>
				{userList.map(({ status, description, name }) => (
					<li className='pagination__list-element' key={name + Math.floor(Math.random() * 1000)}>
						<UserList information={description} status={status} fullName={name} />
					</li>
				))}
			</PaginationList>
		</div>
	)
}
