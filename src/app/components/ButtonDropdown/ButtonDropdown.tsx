import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";
import { FC, PropsWithChildren, useRef, useState } from "react";

import "./scss/ButtonDropdown.scss";

interface IProps {
	name: string,
	buttonID: string,
	arrayOfData: Array<{ key: string, callback: () => void, name: string }>
}

export const ButtonDropdown: FC<IProps> = (props: PropsWithChildren<IProps>) => {
	const [isActive, setIsActive] = useState(false);
	const onClick = () => setIsActive(!isActive);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const options = props.arrayOfData.map((data) =>
		<MenuItem key={data.key} onClick={data.callback}><span>{data.name}</span></MenuItem>
	);

	return (
		<div className="button-dropdown-container" id={props.buttonID}>
			<Button
				ref={anchorRef}
				aria-controls={isActive ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				onClick={onClick}
			>
				{props.name}
			</Button>
			<Popper
				open={isActive}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
				placement="bottom-end"
				modifiers={{
					offset: {
						enabled: true,
						offset: '0, 10'
					}
				}}
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					>
						<Paper>
							<ClickAwayListener onClickAway={() => { setIsActive(false) }}>
								<MenuList autoFocusItem={isActive} id="menu-list-grow">
									{options}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
}
