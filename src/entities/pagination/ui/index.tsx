import { FC, ReactNode, useEffect } from 'react'
import { useStore } from 'effector-react'
import Pagination from 'rc-pagination'

import { $currentPaginationList, $list, changedRangeViewer, setCurrentPage, setList } from 'entities/pagination/model'

import { ReactComponent as Arrow } from '../next.svg'

import './style.scss'

interface IPagination {
	rangeViewer: number
}

const itemRender = (
	current: number,
	type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
	element: ReactNode
) => {
	const changedCurrentPage = () => {
		setCurrentPage(current)
	}

	if (type === 'page') {
		return (
			<div role='presentation' onClick={changedCurrentPage} onKeyPress={changedCurrentPage}>
				{current}
			</div>
		)
	}
	return element
}

export const PaginationList: FC<IPagination> = ({ rangeViewer, children }) => {
	useEffect(() => {
		changedRangeViewer(rangeViewer)
	}, [])

	useEffect(() => {
		setList(children)
	}, [children])

	const initialList = useStore($list)
	const userListPagination = useStore($currentPaginationList)

	return (
		<div className='pagination'>
			<ul className='pagination__list'>{userListPagination}</ul>
			<div className='pagination__dots'>
				<Pagination
					total={initialList?.length}
					pageSize={rangeViewer}
					itemRender={itemRender}
					showSizeChanger
					showLessItems
					pageSizeOptions={[1, 2, 5, 10]}
					nextIcon={
						<div className='pagination__dots--next'>
							<Arrow />
						</div>
					}
					prevIcon={
						<div className='pagination__dots--prev'>
							<Arrow />
						</div>
					}
				/>
			</div>
		</div>
	)
}
