import { Button, ClickAwayListener, Grow, Paper, Popper } from "@material-ui/core";
import LoginPage from "app/screens/LoginPage/LoginPage.screen";
import { FC, useRef, useState } from "react";

import "./scss/LoginPopup.scss";

type Props = {
}

export const LoginPopup: FC<Props> = () => {
	const [isActive, setIsActive] = useState(false);
	const onClick = () => setIsActive(!isActive);
	const anchorRef = useRef<HTMLButtonElement>(null);

	return (
		<div className="login-popup-container">
			<Button
				ref={anchorRef}
				aria-controls={isActive ? 'login-page' : undefined}
				aria-haspopup="true"
				onClick={onClick}
			>
				Login
			</Button>
			<Popper open={isActive} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement="bottom-end">
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					>
						<Paper>
							<ClickAwayListener onClickAway={() => { setIsActive(false) }}>
								<LoginPage />
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
};