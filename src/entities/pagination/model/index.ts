import { combine, createEvent, createStore, sample } from 'effector'

export const changedRangeViewer = createEvent<number>()

export const setCurrentPage = createEvent<number>()
export const $currentPageNumber = createStore<number>(1).on(setCurrentPage, (_, page) => page)

export const $lastListIndex = createStore(0)

export const $firstListIndex = createStore(6)

sample({
	clock: $currentPageNumber,
	source: changedRangeViewer,
	fn: (viewer, page) => viewer * page,
	target: $lastListIndex,
})

sample({
	clock: $lastListIndex,
	source: changedRangeViewer,
	fn: (viewer, page) => page - viewer,
	target: $firstListIndex,
})

export const setList = createEvent<any>()
export const $list = createStore<any>([]).on(setList, (_, list) => list)

$list.watch(el => console.log(el))

export const $currentPaginationList = $list.map(store => store.slice(0, 6))

sample({
	clock: combine({
		$lastListIndex,
		$firstListIndex,
	}),
	source: $list,
	fn: (list, indexes) => list.slice(indexes.$firstListIndex, indexes.$lastListIndex),
	target: $currentPaginationList,
})

$currentPaginationList.watch(el => console.log(el))
