import { Button, Grow, Paper, Popper } from "@material-ui/core";
import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import LoginPage from "src/app/screens/LoginPage/LoginPage.screen";

import "./scss/LoginPopup.scss";

interface IProps {
}

export const LoginPopup: FC<IProps> = () => {
	const { t } = useTranslation();
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
				{t('login')}
			</Button>
			<Popper
				open={isActive}
				anchorEl={anchorRef.current}
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