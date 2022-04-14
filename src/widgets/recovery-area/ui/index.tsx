import { FC } from 'react'

import { FormWrapper } from 'shared/ui/molecules/form-wrapper'
import { RecoveryPassword } from 'features/auth/recovery-password'

export const RecoveryArea: FC = () => {
	return (
		<FormWrapper title='Сброс пароля' canGoBack>
			<RecoveryPassword />
		</FormWrapper>
	)
}
