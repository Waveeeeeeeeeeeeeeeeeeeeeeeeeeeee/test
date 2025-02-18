import { type FC, type PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<div
				style={{ backgroundColor: 'black' }}
				className='flex flex-col min-h-full  overflow-hidden'
			>
				<>{children}</>
			</div>
		</>
	)
}

export default Layout
