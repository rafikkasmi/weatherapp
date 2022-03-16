import { writable } from 'svelte/store';

export const geodata = writable({ lat: 36.7538, long: 3.0588, changed: false });