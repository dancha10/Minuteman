import { FC, ReactNode, useState } from 'react'
import Pagination from 'rc-pagination'

import { UserList } from 'shared/ui/organisms/user-list'

import { ReactComponent as Next } from '../next.svg'

import './style.scss'

interface IPagination {
	list: Array<any>
	rangeViewer: number
}

export const PaginationList: FC<IPagination> = ({ list, rangeViewer }) => {
	const [currentPage, setCurrentPage] = useState<number>(1)
	const lastUserIndex = currentPage * rangeViewer
	const firstUserIndex = lastUserIndex - rangeViewer
	const currentUserList = list.slice(firstUserIndex, lastUserIndex)

	const itemRender = (
		current: number,
		type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
		element: ReactNode
	) => {
		if (type === 'page') {
			return (
				<div role='presentation' onClick={() => setCurrentPage(current)} onKeyPress={() => setCurrentPage(current)}>
					{current}
				</div>
			)
		}
		return element
	}

	return (
		<div className='pagination'>
			<ul className='pagination__list'>
				{currentUserList.map(el => (
					<li className='pagination__element' key={el.name + Math.floor(Math.random() * 999)}>
						<UserList information={el.description} status={el.status} fullName={el.name} />
					</li>
				))}
			</ul>
			<div className='pagination__dots'>
				<Pagination
					total={list.length}
					pageSize={rangeViewer}
					itemRender={itemRender}
					showSizeChanger
					showLessItems
					pageSizeOptions={[1, 2, 5, 10]}
					nextIcon={
						<div className='pagination__dots--next'>
							<Next />
						</div>
					}
					prevIcon={
						<div className='pagination__dots--prev'>
							<Next />
						</div>
					}
				/>
			</div>
		</div>
	)
}
