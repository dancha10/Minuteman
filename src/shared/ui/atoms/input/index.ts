import { Simple } from './simple'
import { Modified } from './modified'

interface InputType {
	Simple: typeof Simple
	Modified: typeof Modified
}

const Input = {} as InputType

Input.Simple = Simple
Input.Modified = Modified

export { Input }