import { FC } from "react";

interface Props {
	class: string,
	content: JSX.Element,
}

export const Information: FC<Props> = (props: Props) => {
	return (
		<div className={props.class + " information"}>
			{props.content}
		</div>
	);
}
