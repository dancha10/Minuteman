import React, { FC, FormEvent, useEffect, useState } from 'react'
import { useForm } from 'effector-forms'
import { useStore } from 'effector-react'

import { Avatar } from 'shared/ui/atoms/avatar'
import { UploadFile } from 'features/upload-file'
import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { CubeLoader } from 'shared/ui/atoms/cube-loader'
import { Dropdown } from 'shared/ui/atoms/dropdown'
import { Textarea } from 'shared/ui/atoms/textarea'
import { Icon } from 'shared/ui/atoms/icon'

import { optionCity, optionSex, optionPets } from '../lib/options'
import { $avatarURL, getProfileData, profileDataFx } from '../model/change-fields'
import { myProfileForm } from '../model/form'

import './style.scss'

export const ProfileForm: FC = () => {
	useEffect(() => {
		getProfileData()
	}, [])

	const { fields, submit, hasError } = useForm(myProfileForm)

	const isLoading = useStore(profileDataFx.pending)
	const avatarURL = useStore($avatarURL)

	const [isEditMode, setIsEditMode] = useState<boolean>(false)

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		submit()
		setIsEditMode(false)
	}

	const onEditMode = () => {
		setIsEditMode(true)
	}

	const isDisabled = hasError('firstName') || hasError('lastName') || hasError('birthDate') || hasError('aboutMe')

	if (isLoading) return <CubeLoader isFull />

	return (
		<form className='profile-form' onSubmit={onSubmit}>
			<div className='profile-form__header'>
				<div className='profile-form__photo'>
					<div className='profile-form__photo-wrapper'>
						<Avatar image={avatarURL} />
						<div className='profile-form__photo-preview'>
							<div className='profile-form__photo-overlay'>
								<img src={avatarURL ?? ''} alt='avatar-preview' />
							</div>
						</div>
					</div>
					<div className='profile-form__photo-changed'>
						<p>Фото профиля</p>
						<UploadFile onChangeFile={fields.profileImage.onChange}>
							<div className='profile-form__upload-file'>
								<Icon name='editAvatar' />
								Изменить фото
							</div>
						</UploadFile>
					</div>
				</div>
				{!isEditMode && (
					<Button.Dark type='button' color='primary' onClickHandler={onEditMode}>
						Редактировать
					</Button.Dark>
				)}
			</div>
			<div className='profile-form__input-list'>
				<div className='profile-form__input-wrapper'>
					<Input.Modified
						id='firstName'
						type='text'
						label='Имя'
						placeholder='Введите имя'
						onChange={fields.firstName.onChange}
						isError={hasError('firstName')}
						errorMessage={fields?.firstName?.errors[0]?.errorText}
						value={fields.firstName.value}
						disabled={!isEditMode}
					/>
				</div>
				<div className='profile-form__input-wrapper'>
					<Input.Modified
						id='lastname'
						type='text'
						label='Фамилия'
						placeholder='Введите фамилию'
						onChange={fields.lastName.onChange}
						isError={hasError('lastName')}
						errorMessage={fields?.lastName?.errors[0]?.errorText}
						value={fields.lastName.value}
						disabled={!isEditMode}
					/>
				</div>
				<div className='profile-form__input-wrapper'>
					<Input.Modified
						id='dateOfBirth'
						type='text'
						label='Дата рождения'
						placeholder='Введите дату рождения'
						onChange={fields.birthDate.onChange}
						isError={hasError('birthDate')}
						errorMessage={fields?.birthDate?.errors[0]?.errorText}
						value={fields.birthDate.value}
						maxLength={10}
						disabled={!isEditMode}
					/>
				</div>
			</div>
			<div className='profile-form__dropdown-list'>
				<div className='profile-form__dropdown-wrapper'>
					<Dropdown
						options={optionCity}
						placeholder='Город'
						label='Город'
						onSelect={fields.cityOfResidence.onChange}
						value={fields.cityOfResidence.value}
						isFirstElement={false}
						isDisabled={!isEditMode}
						isSearch
					/>
				</div>
				<div className='profile-form__dropdown-wrapper'>
					<Dropdown
						options={optionSex}
						placeholder='Пол'
						label='Пол'
						onSelect={fields.gender.onChange}
						value={fields.gender.value}
						isFirstElement={false}
						isDisabled={!isEditMode}
					/>
				</div>
				<div className='profile-form__dropdown-wrapper'>
					<Dropdown
						options={optionPets}
						placeholder='Наличие животного'
						label='Животное'
						onSelect={fields.hasPet.onChange}
						value={fields.hasPet.value}
						isFirstElement={false}
						isDisabled={!isEditMode}
					/>
				</div>
			</div>
			<div className='profile-form__textarea-wrapper profile-form__textarea-wrapper--short'>
				<Textarea
					maxLength={99}
					placeholder='Введите краткую информацию о себе'
					label='Краткая информация'
					isVisibleCounter={isEditMode}
					onChange={fields.smallAboutMe.onChange}
					value={fields.smallAboutMe.value}
					disabled={!isEditMode}
				/>
			</div>
			<div className='profile-form__textarea-wrapper profile-form__textarea-wrapper--about'>
				<Textarea
					maxLength={300}
					placeholder='Распишите подробнее о себе'
					label='О себе'
					isVisibleCounter={isEditMode}
					onChange={fields.aboutMe.onChange}
					value={fields.aboutMe.value}
					disabled={!isEditMode}
				/>
			</div>
			<div className='profile-form__footer'>
				{isEditMode && (
					<Button.Dark type='submit' color='primary' disabled={isDisabled}>
						Сохранить изменения
					</Button.Dark>
				)}
			</div>
		</form>
	)
}
