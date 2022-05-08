import { FC } from 'react'
import SkeletonLoading from 'react-loading-skeleton'

interface ISkeleton {
	isLoading?: boolean
	width?: string
	height?: string
	count?: number
	className?: string
}

export const Skeleton: FC<ISkeleton> = ({
	children,
	isLoading = false,
	width = '100%',
	height = '100%',
	count = 1,
	className,
}) =>
	isLoading ? <SkeletonLoading count={count} width={width} height={height} className={className} /> : <>{children}</>
