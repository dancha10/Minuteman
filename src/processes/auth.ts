import { createEffect, createEvent, sample } from 'effector'

import { AuthModel } from 'features/auth/by-email'
import { ReviewModel } from 'widgets/review-modal'
import { ProfileFormModel } from 'widgets/profile-form'
import { ReviewListModel } from 'widgets/review-list'
import { UserPaginationModel } from 'entities/pagination'
import { history } from 'shared/lib'

export const checkedAuth = createEvent()

const checkAuthFx = createEffect<void, string | null, Error>(() => localStorage.getItem('@token'))

sample({
	clock: checkedAuth,
	target: checkAuthFx,
})

sample({
	clock: checkAuthFx.doneData,
	fn: token => !!token,
	target: AuthModel.$isAuthenticated,
})

const clearLocalStorageFx = createEffect(() => localStorage.removeItem('@token'))
const redirectToLoginPageFx = createEffect(() => history.push('/login'))

sample({
	clock: [
		ReviewModel.createReviewFx.failData,
		ProfileFormModel.profileDataFx.failData,
		ReviewListModel.reviewsFx.failData,
		UserPaginationModel.getUserListFx.failData,
	],
	filter: error => error.message === 'Unauthorized',
	target: clearLocalStorageFx,
})

sample({
	clock: clearLocalStorageFx.doneData,
	target: redirectToLoginPageFx,
})
