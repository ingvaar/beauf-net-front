import { FC } from "react"
import { Menubar } from "../menubar/Menubar"

export const Layout: FC = ({ children }) => {
	return (
		<div id='layout' className='column'>
			<Menubar />
			<main>{children}</main>
			<footer />
		</div>
	)
}