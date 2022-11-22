import { writable, derived } from 'svelte/store';

export const dragDistance = writable(window.innerWidth / 2);
export const cappedDragDistance = derived(dragDistance, (newDistance) =>
	Math.max(0, Math.min(window.innerWidth - 6, newDistance))
);
export const isBeingDragged = writable(false);
