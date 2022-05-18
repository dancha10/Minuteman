import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector-logger'

import { Types } from 'shared/lib'
import { getUsersList } from 'shared/api'

export const getUserList = createEvent()

export const getUserListFx = createEffect<void, Types.MyProfileType[], Error>(async () => await getUsersList())

export const $userList = restore<Types.MyProfileType[]>(getUserListFx.doneData, [])

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

export const filteredList = createEvent<string | boolean>()
export const $filteredUserList = $userList.map(list => list)

sample({
	clock: getUserList,
	target: getUserListFx,
})

sample({
	clock: filteredList,
	source: $userList,
	filter: (_, filterStatus) => filterStatus !== 'all',
	fn: (list, filterStatus) => {
		console.log(list, filterStatus)
		return list?.filter(user => user.academyStatus === filterStatus)
	},
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

filteredList.watch(el => console.log(el))
