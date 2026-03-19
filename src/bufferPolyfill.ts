import { Buffer } from 'buffer'

/** Loaded before app modules so gray-matter can use `Buffer` in the browser bundle. */
Object.assign(globalThis, { Buffer })
