// Valid path for a Firestore DocumentReference
export const VALID_DOC_PATH = /^\/?[A-Za-z0-9_]+\/[A-Za-z0-9_]+(\/[A-Za-z0-9_]+\/[A-Za-z0-9_]+)*\/?$/

// Valid path for a Firestore CollectionReference
export const VALID_COLL_PATH = /^\/?[A-Za-z0-9_]+(\/[A-Za-z0-9_]+\/[A-Za-z0-9_]+)*\/?$/

// Valid path for a Firestore DocumentSnapshot Field
export const VALID_FIELD_PATH = /^[A-Za-z0-9_]+(\.[A-Za-z0-9_]+)*$/