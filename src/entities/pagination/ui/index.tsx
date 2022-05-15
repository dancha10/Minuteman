import { FC, ReactNode, useEffect } from 'react'
import { useList, useStore } from 'effector-react'
import Pagination from 'rc-pagination'

import { UserList } from 'shared/ui/organisms/user-list'
import { Skeleton } from 'shared/ui/atoms/skeleton'
import { Empty } from 'shared/ui/atoms/empty'
import { Icon } from 'shared/ui/atoms/icon'

import { $currentPaginationList, $userList, getUserList, getUserListFx, setCurrentPage } from '../model'

import './style.scss'

interface IPagination {
	rangeViewer: number
}

const itemRender = (
	current: number,
	type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
	element: ReactNode
): ReactNode => {
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

const CurrentPaginationList: FC = () => {
	const list = useList(
		$currentPaginationList,
		({ profileImage, firstName, lastName, smallAboutMe, academyStatus }) => (
			<li className='pagination__list-item'>
				<UserList
					information={smallAboutMe!}
					status={academyStatus}
					fullName={`${firstName} ${lastName}`}
					image={profileImage ? `https://academtest.ilink.dev/images/${profileImage}` : null}
				/>
			</li>
		)
	)
	return <ul className='pagination__list'>{list}</ul>
}

export const UserPagination: FC<IPagination> = ({ rangeViewer }) => {
	useEffect(() => {
		getUserList()
	}, [])

	const initialList = useStore($userList)
	const isLoading = useStore(getUserListFx.pending)
	const currentList = useStore($currentPaginationList)

	return (
		<div className='pagination'>
			{currentList ? (
				isLoading ? (
					[...new Array(6)].map((_, index) => (
						<div className='pagination__skeleton' key={index}>
							<Skeleton height='41px' width='100%' isLoading={isLoading} />
						</div>
					))
				) : (
					<CurrentPaginationList />
				)
			) : (
				<Empty />
			)}
			<Skeleton isLoading={isLoading} height='30px' width='350px'>
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
								<Icon name='next' />
							</div>
						}
						prevIcon={
							<div className='pagination__dots--prev'>
								<Icon name='next' />
							</div>
						}
					/>
				</div>
			</Skeleton>
		</div>
	)
}
