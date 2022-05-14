import * as yup from 'yup'
import { Rule } from 'effector-forms'

export function createRule<V, T = any>({ schema, name }: { schema: yup.SchemaOf<T>; name: string }): Rule<V> {
	return {
		name,
		validator: (value: V) => {
			try {
				schema.validateSync(value)
				return {
					isValid: true,
					value,
				}
			} catch (err: any) {
				return {
					isValid: false,
					value,
					errorText: err.message,
				}
			}
		},
	}
}
