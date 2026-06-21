/** Shape of the button element. */
export enum BordaButtonShape {
	RECTANGLE = 'rectangle',
	CIRCLE = 'circle',
	SQUARE = 'square'
}

/** Visual variant of the button. */
export enum BordaButtonVariant {
	/** Solid background fill. */
	FILLED = 'filled',
	/** Transparent background, bordered. */
	OUTLINED = 'outlined',
	/** Transparent background, subtle hover surface. */
	GHOST = 'ghost',
	/** Transparent background, text only. */
	TEXT = 'text'
}

/** HTML `type` attribute for the button element. */
export enum BordaButtonType {
	BUTTON = 'button',
	SUBMIT = 'submit',
	RESET = 'reset'
}
