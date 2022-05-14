import { FC } from 'react'
import { useStore } from 'effector-react'

import { UserViewer } from 'shared/ui/molecules/user-viewer'
import { $isMobileWidth } from 'shared/lib'

import { $userProfile } from '../model'

export const User: FC = () => {
	const isMobile = useStore($isMobileWidth)
	const userProfile = useStore($userProfile)
	return (
		<UserViewer
			fullName={`${userProfile?.firstName} ${userProfile?.lastName}`}
			image={userProfile?.profileImage ? `https://academtest.ilink.dev/images/${userProfile.profileImage}` : null}
			isMobileWidth={isMobile}
		/>
	)
}
