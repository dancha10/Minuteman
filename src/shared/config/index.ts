export const getEnvVar = (key: string) => {
	if (import.meta.env[key] === undefined) {
		throw new Error(`Env variable ${key} is required`)
	}
	return import.meta.env[key] || ''
}
