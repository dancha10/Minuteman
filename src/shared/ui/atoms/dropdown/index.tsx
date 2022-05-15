import { FC } from 'react'
import Select, { components, SingleValue } from 'react-select'

import { Types } from 'shared/lib'
import { Icon } from 'shared/ui/atoms/icon'

import './style.scss'

interface IDropdown {
	options: Array<Types.OptionProps['option']>
	onSelect?: (item: SingleValue<Types.OptionProps['option']>) => void
	placeholder?: string
	label?: string
	isFirstElement?: boolean
	isDisabled?: boolean
	isScroll?: boolean
	value?: Types.OptionProps['option']
}

const DropdownIndicator = (props: any) => {
	return (
		components.DropdownIndicator && (
			<components.DropdownIndicator {...props}>
				<Icon name='dropdownArrow' />
			</components.DropdownIndicator>
		)
	)
}

export const Dropdown: FC<IDropdown> = ({
	options,
	onSelect,
	placeholder,
	label,
	isFirstElement = true,
	isScroll = false,
	isDisabled,
	value,
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
				onChange={onSelect}
				placeholder={placeholder}
				isDisabled={isDisabled}
				captureMenuScroll={isScroll}
				value={value}
			/>
		</div>
	)
}
