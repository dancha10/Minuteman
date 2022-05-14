import { sample } from 'effector'

import { HeaderModel } from 'widgets/header'
import { ProfileFormModel } from 'widgets/profile-form/'

sample({
	clock: ProfileFormModel.getProfileData,
	target: HeaderModel.getUserData,
})
