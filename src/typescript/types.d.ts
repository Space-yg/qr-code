/** KIND field values */
type KINDField = "individual" | "group" | "org" | "location" | `x-${string}`

/** All fields in a vCard */
type vCardFields = {
	/** Name of the holder of the vCard */
	N: {
		prefix: string
		first: string
		middle: string
		last: string
		suffix: string
	}

	/** Nicknames of the holder of the vCard */
	NICKNAME: string

	/** Photo of the vCard holder */
	PHOTO: string

	/** Birthday of the vCard holder */
	BDAY: string

	/** Kind of vCard */
	KIND: KINDField
}