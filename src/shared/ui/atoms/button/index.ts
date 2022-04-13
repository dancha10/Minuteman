import { Light } from './light'
import { Dark } from './dark'

interface ButtonsType {
	Light: typeof Light
	Dark: typeof Dark
}

const Button = {} as ButtonsType

Button.Light = Light
Button.Dark = Dark

export { Button }