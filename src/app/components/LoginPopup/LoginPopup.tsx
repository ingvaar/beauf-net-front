import { Button, Grow, Paper, Popper } from "@material-ui/core";
import LoginPage from "app/screens/LoginPage/LoginPage.screen";
import { FC, useRef, useState } from "react";

import "./scss/LoginPopup.scss";

interface IProps {
}

export const LoginPopup: FC<IProps> = () => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const onClick = () => setIsActive(!isActive);

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
							<LoginPage />
						</Paper>
					</Grow>
				)}
			</Popper>
		</div>
	);
};