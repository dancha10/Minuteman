import { createEvent, createStore, sample } from 'effector'

import { Types, users } from 'shared/lib'

export const $userList = createStore<Types.IUserInfo[]>(users)

export const filteredList = createEvent<string>()

export const $filteredUserList = createStore<Types.IUserInfo[]>(users)

sample({
	clock: filteredList,
	source: $userList,
	filter: (_, filterStatus) => filterStatus !== 'all',
	fn: (list, filterStatus) => list.filter(user => user.status === filterStatus),
	target: $filteredUserList,
})

sample({
	clock: filteredList,
	source: $userList,
	filter: (_, filterStatus) => filterStatus === 'all',
	target: $filteredUserList,
})
