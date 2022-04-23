import { FC } from 'react'
import Select, { components } from 'react-select'

import { Types } from 'shared/lib'

import { ReactComponent as Arrow } from './arrow.svg'

import './style.scss'

interface IDropdown {
	options: Array<Types.OptionProps['option']>
	onChanged?: (value: string) => void
	placeholder?: string
	label?: string
	isFirstElement?: boolean
	isDisabled?: boolean
	isScroll?: boolean
	value?: Types.OptionProps['option']
	fields?: Object
}

const DropdownIndicator = (props: any) => {
	return (
		components.DropdownIndicator && (
			<components.DropdownIndicator {...props}>
				<Arrow />
			</components.DropdownIndicator>
		)
	)
}

export const Dropdown: FC<IDropdown> = ({
	options,
	onChanged,
	placeholder,
	label,
	isFirstElement = true,
	isScroll = false,
	isDisabled,
	value,
	fields,
}) => {
	return (
		<div className='dropdown-wrapper'>
			{label && <label>{label}</label>}
			<Select
				options={options}
				classNamePrefix='dropdown'
				defaultValue={isFirstElement ? options[0] : undefined}
				isSearchable={false}
				components={{ DropdownIndicator }}
				onChange={onChanged && ((el: any) => onChanged(el?.value!))}
				placeholder={placeholder}
				isDisabled={isDisabled}
				captureMenuScroll={isScroll}
				value={value}
				{...fields}
			/>
		</div>
	)
}
