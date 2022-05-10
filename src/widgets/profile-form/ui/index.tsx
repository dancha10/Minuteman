import React, { FC, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useStore } from 'effector-react'

import { Avatar } from 'shared/ui/atoms/avatar'
import { UploadFile, UploadFileModel } from 'features/upload-file'
import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { CubeLoader } from 'shared/ui/atoms/cube-loader'
import { Dropdown } from 'shared/ui/atoms/dropdown'
import { Textarea } from 'shared/ui/atoms/textarea'
import { localeDateString } from 'shared/lib'

import { validationFields } from '../lib/validationFields'
import { ReactComponent as Edit } from '../lib/edit.svg'
import { optionCity, optionSex, optionPets } from '../lib/options'
import {
	$dateFieldError,
	$profileData,
	getProfileData,
	IProfileInputFields,
	profileDataFx,
	setDateError,
	updatedProfilePhoto,
	updateFields,
} from '../model/form'

import './style.scss'

export const ProfileForm: FC = () => {
	useEffect(() => {
		getProfileData()
	}, [])

	const isLoading = useStore(profileDataFx.pending)
	const file = useStore(UploadFileModel.$uploadImage)
	const profile = useStore($profileData)

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

	useEffect(() => {
		if (file) {
			const formData = new FormData()
			formData.append('profileImage', avatarUploadRef?.current?.files?.[0]!)
			updatedProfilePhoto(formData)
		}
	}, [file])

	const dataField = useStore($dateFieldError)

	const onSubmit: SubmitHandler<IProfileInputFields> = fields => {
		if (new Date(fields.birthDate) > new Date()) {
			return setDateError('Дата рождения не должна быть больше сегодняшней')
		}
		updateFields({
			firstName: fields.firstName ?? profile.firstName,
			lastName: fields.lastName ?? profile.lastName,
			birthDate: fields.birthDate ?? profile.birthDate,
			gender: fields.gender ?? { value: profile.gender, label: profile.gender },
			cityOfResidence: fields.cityOfResidence ?? {
				value: profile.gender,
				label: profile.gender === 'male' ? 'Мужчина' : 'Женщина',
			},
			hasPet: fields.hasPet ?? { value: profile.hasPet, label: profile.hasPet ? 'Есть' : 'Нет' },
			aboutMe: fields.aboutMe ?? profile.aboutMe,
			smallAboutMe: fields.smallAboutMe ?? profile.smallAboutMe,
		})
		setIsEditMode(false)
	}

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IProfileInputFields>({ mode: 'onChange' })

	const onEditMode = () => {
		setIsEditMode(true)
	}

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
					<Button.Dark type='button' color='primary' onClickHandler={onEditMode}>
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
						validation={{ ...register('firstName', validationFields.firstName) }}
						isError={!!errors.firstName?.message}
						errorMessage={errors.firstName?.message}
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
						validation={{ ...register('birthDate') }}
						isError={!!dataField}
						errorMessage={dataField}
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
						name='cityOfResidence'
						defaultValue={{ value: profile.cityOfResidence, label: profile.cityOfResidence }}
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
						name='gender'
						defaultValue={{ value: profile.gender, label: profile.gender === 'male' ? 'Мужчина' : 'Женщина' }}
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
						name='hasPet'
						defaultValue={{ value: profile.hasPet, label: profile.hasPet ? 'Есть' : 'Нет' }}
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
					validation={{ ...register('smallAboutMe') }}
					label='Краткая информация'
					isVisibleCounter={isEditMode}
					disabled={!isEditMode}
					value={profile?.smallAboutMe ?? ''}
				/>
			</div>
			<div className='profile-form__textarea-wrapper profile-form__textarea-wrapper--about'>
				<Textarea
					maxLength={300}
					placeholder='Распишите подробнее о себе'
					validation={{ ...register('aboutMe') }}
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
