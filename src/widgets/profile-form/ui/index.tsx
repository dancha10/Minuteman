import { FC, useRef, useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { useStore } from 'effector-react'

import { Avatar } from 'shared/ui/atoms/avatar'
import { UploadFile } from 'features/upload-file'
import { Button } from 'shared/ui/atoms/button'
import { Input } from 'shared/ui/atoms/input'
import { Dropdown } from 'shared/ui/atoms/dropdown'
import { Textarea } from 'shared/ui/atoms/textarea'
import { useNotification } from 'entities/notification'

import { validationFields } from '../lib/validationFields'
import { ReactComponent as Edit } from '../lib/edit.svg'
import { $fieldsForm, IProfileFormFields, setFieldsForm } from '../model/form'

import './style.scss'

const optionCity = [
	{ value: 'Томск', label: 'Томск' },
	{ value: 'Кемерово', label: 'Кемерово' },
	{ value: 'Анжеро-Судженск', label: 'Анжеро-Судженск' },
	{ value: 'Москва', label: 'Москва' },
	{ value: 'Расчлененград', label: 'Санкт-Петербург' },
]

const optionSex = [
	{ value: 'Мужчина', label: 'Мужчина' },
	{ value: 'Женщина', label: 'Женщина' },
]

const optionPets = [
	{ value: 'Есть', label: 'Есть' },
	{ value: 'Нет', label: 'Нет' },
]

const imageAvatar = 'https://www.meme-arsenal.com/memes/307290bf13f66c6a976fcf56d32cad21.jpg' // типо приходит с бэка

export const ProfileForm: FC = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IProfileFormFields>({ mode: 'onChange' })
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const avatarUploadRef = useRef<HTMLInputElement>(null)

	const notify = useNotification()

	const onSubmit: SubmitHandler<IProfileFormFields> = data => {
		console.log(data)
		setFieldsForm(data)
		notify('success', 'Сохранено', 'Данные успешно отредактированы!')
		setIsEditMode(false)
	}

	const fields = useStore($fieldsForm)

	return (
		<form className='profile-form' onSubmit={handleSubmit(onSubmit)}>
			<div className='profile-form__header'>
				<div className='profile-form__photo'>
					<div className='profile-form__photo-wrapper'>
						<Avatar image={imageAvatar} />
						<div className='profile-form__photo-preview'>
							<div className='profile-form__photo-overlay'>
								<img src={imageAvatar} alt='avatar-preview' />
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
						value={fields.firsName}
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
						value={fields.lastName}
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
						value={fields.dateOfBirth}
					/>
				</div>
			</div>
			<div className='profile-form__dropdown-list'>
				<div className='profile-form__dropdown-wrapper'>
					<Controller
						render={({ field }) => (
							<Dropdown
								fields={field}
								options={optionCity}
								placeholder='Город'
								label='Город'
								isFirstElement={false}
								isDisabled={!isEditMode}
							/>
						)}
						defaultValue={fields.city}
						name='city'
						control={control}
					/>
				</div>
				<div className='profile-form__dropdown-wrapper'>
					<Controller
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
						defaultValue={fields.sex}
						name='sex'
						control={control}
					/>
				</div>
				<div className='profile-form__dropdown-wrapper'>
					<Controller
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
						defaultValue={fields.pet}
						name='pet'
						control={control}
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
					value={fields.shortInfo}
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
					value={fields.aboutMe}
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
