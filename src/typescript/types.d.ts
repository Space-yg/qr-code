/** KIND field values */
type KINDFieldOptions = "individual" | "group" | "org" | "location" | `x-${string}`

type GENDERFieldOptions = "M" | "F" | "N" | "U"

/** All fields in a vCard */
type vCardFields = {
	/**
	 * Name of the object the vCard represents
	 * 
	 * {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.2 RFC6350#6.2.2}
	 */
	N: {
		/** Prefix of the name */
		prefix: string
		/** First name */
		first: string
		/** Middle name */
		middle: string
		/** Last/Family name */
		last: string
		/** Suffix of the name */
		suffix: string
	}

	/**
	 * Nicknames of the object the vCard represents
	 * 
	 * {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.3 RFC6350#6.2.3}
	 */
	NICKNAME: string

	/**
	 * Gender of the object the vCard represents
	 * 
	 * {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.7 RFC6350#6.2.7}
	 */
	GENDER: GENDERFieldOptions

	/**
	 * Photo of the object the vCard represents
	 * 
	 * {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.4 RFC6350#6.2.4}
	 */
	PHOTO: string

	/**
	 * Birthday of the object the vCard represents
	 * 
	 * {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.5 RFC6350#6.2.5}
	 */
	BDAY: string

	/**
	 * Date of marriage of the object the vCard represents
	 * 
	 * {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.2.6 RFC6350#6.2.6}
	 */
	ANNIVERSARY: string

	/**
	 * Kind of vCard
	 * 
	 * {@link https://datatracker.ietf.org/doc/html/rfc6350#section-6.1.4 RFC6350#6.1.4}
	 */
	KIND: KINDFieldOptions
}