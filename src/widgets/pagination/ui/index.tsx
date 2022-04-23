import { FC, useEffect, useState } from 'react'

import { PaginationList } from 'entities/pagination'

interface IPagination {
	list: Array<any>
	rangeViewer: number
	filterSign: string
}

export const Pagination: FC<IPagination> = ({ list, rangeViewer, filterSign }) => {
	const filter = (props: string) => {
		if (props !== 'all') return list.filter(el => el.status === props)
		return list
	}
	const [filteringList, setFilteringList] = useState(filter('all'))

	useEffect(() => {
		setFilteringList(filter(filterSign))
	}, [filterSign])

	return (
		<div className='pagination'>
			<PaginationList list={filteringList} rangeViewer={rangeViewer} />
		</div>
	)
}
