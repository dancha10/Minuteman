import React, { FC, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useStore } from 'effector-react'

import { Avatar } from 'shared/ui/atoms/avatar'
import { UploadFile } from 'features/upload-file'
import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { CubeLoader } from 'shared/ui/atoms/cube-loader'
import { Dropdown } from 'shared/ui/atoms/dropdown'
import { Textarea } from 'shared/ui/atoms/textarea'
import { useNotification } from 'entities/notification'
import { localeDateString } from 'shared/lib'

import { validationFields } from '../lib/validationFields'
import { ReactComponent as Edit } from '../lib/edit.svg'
import { optionCity, optionSex, optionPets } from '../lib/options'
import { $profileData, getProfileData, IProfileFormFields, profileDataFx, setFieldsForm } from '../model/form'

import './style.scss'

export const ProfileForm: FC = () => {
	useEffect(() => {
		getProfileData()
	}, [])

	const profile = useStore($profileData)
	const isLoading = useStore(profileDataFx.pending)

	const [inputDateValue, setInputDateValue] = useState('')
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const avatarUploadRef = useRef<HTMLInputElement>(null)

	const maskDate = (value: string) => {
		const dateString = value.replace(/\D/g, '').slice(0, 10)
		if (dateString.length >= 5) {
			return setInputDateValue(`${dateString.slice(0, 2)}.${dateString.slice(2, 4)}.${dateString.slice(4)}`)
		}
		if (dateString.length >= 3) {
			return setInputDateValue(`${dateString.slice(0, 2)}.${dateString.slice(2)}`)
		}
		return setInputDateValue(dateString)
	}

	useEffect(() => {
		maskDate(localeDateString(profile.birthDate))
	}, [profile.birthDate])

	const notify = useNotification()

	const onSubmit: SubmitHandler<IProfileFormFields> = data => {
		setFieldsForm(data)
		notify('success', 'Сохранено', 'Данные успешно отредактированы!')
		setIsEditMode(false)
	}

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IProfileFormFields>({ mode: 'onChange' })

	if (isLoading) return <CubeLoader isFull />

	return (
		<form className='profile-form' onSubmit={handleSubmit(onSubmit)}>
			<div className='profile-form__header'>
				<div className='profile-form__photo'>
					<div className='profile-form__photo-wrapper'>
						<Avatar image={`https://academtest.ilink.dev/images/${profile.profileImage}`} />
						<div className='profile-form__photo-preview'>
							<div className='profile-form__photo-overlay'>
								<img src={`https://academtest.ilink.dev/images/${profile.profileImage}`} alt='avatar-preview' />
							</div>
						</div>
					</div>
					<div className='profile-form__photo-changed'>
						<p>Фото профиля</p>
						<UploadFile fileRef={avatarUploadRef}>
							<div className='profile-form__upload-file'>
								<Edit />
								Изменить фото
							</div>
						</UploadFile>
					</div>
				</div>
				{!isEditMode && (
					<Button.Dark type='button' color='primary' onClickHandler={() => setIsEditMode(true)}>
						Редактировать
					</Button.Dark>
				)}
			</div>
			<div className='profile-form__input-list'>
				<div className='profile-form__input-wrapper'>
					<Input.Modified
						placeholder='Введите имя'
						disabled={!isEditMode}
						id='firstname'
						label='Имя'
						type='text'
						validation={{ ...register('firsName', validationFields.firstName) }}
						isError={!!errors.firsName?.message}
						errorMessage={errors.firsName?.message}
						defaultValue={profile?.firstName}
					/>
				</div>
				<div className='profile-form__input-wrapper'>
					<Input.Modified
						placeholder='Введите фамилию'
						disabled={!isEditMode}
						id='lastname'
						label='Фамилия'
						type='text'
						validation={{ ...register('lastName', validationFields.lastName) }}
						isError={!!errors.lastName?.message}
						errorMessage={errors.lastName?.message}
						defaultValue={profile?.lastName}
					/>
				</div>
				<div className='profile-form__input-wrapper'>
					<Input.Modified
						placeholder='Введите дату рождения'
						disabled={!isEditMode}
						id='dateOfBirth'
						label='Дата рождения'
						type='text'
						validation={{ ...register('dateOfBirth', validationFields.dateOfBirth) }}
						isError={!!errors.dateOfBirth?.message}
						errorMessage={errors.dateOfBirth?.message}
						value={inputDateValue}
						onChange={maskDate}
						maxLength={10}
					/>
				</div>
			</div>
			<div className='profile-form__dropdown-list'>
				<div className='profile-form__dropdown-wrapper'>
					<Controller
						control={control}
						name='city'
						defaultValue={profile.cityOfResidence}
						render={({ field }) => (
							<Dropdown
								fields={{ ...field }}
								options={optionCity}
								placeholder='Город'
								label='Город'
								isFirstElement={false}
								isDisabled={!isEditMode}
							/>
						)}
					/>
				</div>
				<div className='profile-form__dropdown-wrapper'>
					<Controller
						control={control}
						name='sex'
						defaultValue={profile?.gender}
						render={({ field }) => (
							<Dropdown
								fields={field}
								options={optionSex}
								placeholder='Пол'
								label='Пол'
								isFirstElement={false}
								isDisabled={!isEditMode}
							/>
						)}
					/>
				</div>
				<div className='profile-form__dropdown-wrapper'>
					<Controller
						control={control}
						name='pet'
						defaultValue='Mda'
						render={({ field }) => (
							<Dropdown
								fields={field}
								options={optionPets}
								placeholder='Наличие животного'
								label='Животное'
								isFirstElement={false}
								isDisabled={!isEditMode}
							/>
						)}
					/>
				</div>
			</div>
			<div className='profile-form__textarea-wrapper profile-form__textarea-wrapper--short'>
				<Textarea
					maxLength={99}
					placeholder='Введите краткую информацию о себе'
					isError={false}
					validation={{}}
					label='Краткая информация'
					isVisibleCounter={isEditMode}
					disabled={!isEditMode}
					value={profile?.smallAboutMe!}
				/>
			</div>
			<div className='profile-form__textarea-wrapper profile-form__textarea-wrapper--about'>
				<Textarea
					maxLength={300}
					placeholder='Распишите подробнее о себе'
					isError={false}
					validation={{}}
					label='О себе'
					isVisibleCounter={isEditMode}
					disabled={!isEditMode}
					value={profile?.aboutMe}
				/>
			</div>
			<div className='profile-form__footer'>
				{isEditMode && (
					<Button.Dark type='submit' color='primary'>
						Сохранить изменения
					</Button.Dark>
				)}
			</div>
		</form>
	)
}
