import { FC, useEffect, useRef, useState } from 'react'
import Select, { components, SingleValue } from 'react-select'

import { Types, useOutsideClick } from 'shared/lib'
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
	isSearch?: boolean
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
	isSearch = false,
	value,
}) => {
	const [isOpen, setOpen] = useState<boolean>(false)
	const [searchValue, setSearchValue] = useState<string>('')
	const [searchOptions, setSearchOptions] = useState<{ value: string | boolean; label: string }[]>(options)
	const selectRef = useRef<any>(null)

	const onMenuOpen = () => setOpen(true)
	const onMenuClose = () => setOpen(false)

	const searchableOptions = (value: string) => {
		const searchOption = options.filter(option => option.label.toLowerCase().includes(value.toLowerCase()))
		setSearchOptions(searchOption)
	}

	const onChange = (value: SingleValue<Types.OptionProps['option']>) => {
		onSelect && onSelect(value)
		onMenuClose()
	}

	useOutsideClick(selectRef, onMenuClose)

	useEffect(() => {
		searchableOptions(searchValue)
	}, [searchValue])

	return (
		<div className='dropdown-wrapper' data-is-search={isSearch} ref={selectRef}>
			{label && <label>{label}</label>}
			{isSearch && isOpen && (
				<div className='dropdown-wrapper__search-wrapper'>
					<div className='dropdown-wrapper__search'>
						<input
							type='text'
							className='dropdown-wrapper__input'
							onChange={event => setSearchValue(event.target.value)}
							value={searchValue}
						/>
						<div className='dropdown-wrapper__magnifier'>
							<Icon name='search' />
						</div>
					</div>
				</div>
			)}
			<Select
				options={isSearch ? searchOptions : options}
				classNamePrefix='dropdown'
				defaultValue={isFirstElement ? options[0] : undefined}
				isSearchable={false}
				components={{ DropdownIndicator }}
				onChange={onChange}
				placeholder={placeholder}
				isDisabled={isDisabled}
				captureMenuScroll={isScroll}
				onMenuOpen={onMenuOpen}
				menuIsOpen={isOpen}
				value={value}
			/>
		</div>
	)
}
