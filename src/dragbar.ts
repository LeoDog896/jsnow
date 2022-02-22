import { writable } from "svelte/store";

export const dragDistance = writable(window.innerWidth / 2)
export const isBeingDragged = writable(false)