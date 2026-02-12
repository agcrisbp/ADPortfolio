import { hookstate, useHookstate } from '@hookstate/core';
import { localstored } from '@hookstate/localstored';
import { useEffect } from 'react';
import { useMedia } from 'react-use';

import type { State } from '@hookstate/core';
import type { Settings } from '~/types';

// Global state key
export const STATE_KEY = 'settings';

/**
 * Menggunakan hookstate() sebagai pengganti createState().
 * Hookstate v4 memindahkan fungsionalitas global state ke fungsi ini.
 */
const DEFAULT_STATE = hookstate<Settings>({
	animations: null,
	sound: true,
});

export function usePersistantState(): State<Settings> {
	const noMotionPreference = useMedia('(prefers-reduced-motion: no-preference)', true);

	/**
	 * Gunakan useHookstate() sebagai pengganti useState().
	 * Note: Jika kamu menggunakan Hookstate v4, Persistence API sudah banyak berubah.
	 * Jika kamu masih ingin menggunakan manual attach:
	 */
	const state = useHookstate<Settings>(DEFAULT_STATE);

	useEffect(() => {
		// Menangani persistensi secara manual jika plugin Persistence bermasalah di Turbopack
		const savedState = localStorage.getItem(STATE_KEY);
		if (savedState) {
			try {
				state.set(JSON.parse(savedState));
			} catch (e) {
				console.error("Failed to parse settings from localStorage", e);
			}
		}

		// Sinkronisasi preferensi animasi jika belum diatur
		if (state.get().animations === null) {
			state.merge({
				animations: noMotionPreference,
			});
		}
	}, [noMotionPreference]);

	// Effect untuk menyimpan perubahan ke localStorage (pengganti plugin Persistence jika error)
	useEffect(() => {
		localStorage.setItem(STATE_KEY, JSON.stringify(state.get()));
	}, [state.get()]);

	return state;
}
