import { Dispatch, SetStateAction, useEffect } from 'react';

export default (
	toggleState:
		| Dispatch<SetStateAction<boolean>>
		| Dispatch<SetStateAction<boolean>>[],
	buttonRef: HTMLElement | HTMLElement[]
) => {
	useEffect(() => {
		const toggle = () => {
			if (Array.isArray(toggleState)) {
				toggleState.forEach((setter) => setter((value) => !value));
			} else toggleState((value) => !value);
		};

		if (buttonRef !== undefined) {
			if (Array.isArray(buttonRef))
				buttonRef.forEach((button) => {
					button.addEventListener('click', toggle);
				});
			else buttonRef.addEventListener('click', toggle);

			return () => {
				if (Array.isArray(buttonRef))
					buttonRef.forEach((button) => {
						button.removeEventListener('click', toggle);
					});
				else buttonRef.removeEventListener('click', toggle);
			};
		}

		return () => {};
	}, [buttonRef, toggleState]);
};
