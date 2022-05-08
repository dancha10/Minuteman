import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector'

import { Types } from 'shared/lib'
import { getUsersList } from 'shared/api'

export const getUserList = createEvent()

export const getUserListFx = createEffect<void, Types.ListReviewsType[], Error>(async () => await getUsersList())

export const $userList = restore<Types.ListReviewsType[]>(getUserListFx.doneData, [])

export const $changedRangeViewer = createStore<number>(6)

export const setCurrentPage = createEvent<number>()
export const $currentPageNumber = restore<number>(setCurrentPage, 1)

export const $lastListIndex = createStore(0)
export const $firstListIndex = createStore(6)

sample({
	clock: $currentPageNumber,
	source: $changedRangeViewer,
	fn: (viewer, page) => viewer * page,
	target: $lastListIndex,
})

sample({
	clock: $lastListIndex,
	source: $changedRangeViewer,
	fn: (viewer, page) => page - viewer,
	target: $firstListIndex,
})

export const filteredList = createEvent<string>()
export const $filteredUserList = $userList.map(list => list)

sample({
	clock: getUserList,
	target: getUserListFx,
})

sample({
	clock: filteredList,
	source: $userList,
	filter: (_, filterStatus) => filterStatus !== 'all',
	fn: (list, filterStatus) => list?.filter(user => user.status === filterStatus),
	target: $filteredUserList,
})

sample({
	clock: filteredList,
	source: $userList,
	filter: (_, filterStatus) => filterStatus === 'all',
	target: $filteredUserList,
})

export const $currentPaginationList = $filteredUserList.map(store => store.slice(0, 6))

sample({
	clock: combine({
		$lastListIndex,
		$firstListIndex,
	}),
	source: $userList,
	fn: (list, indexes) => list.slice(indexes.$firstListIndex, indexes.$lastListIndex),
	target: $currentPaginationList,
})
