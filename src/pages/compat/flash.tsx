import type { HolyPage } from '../../App';
import type { ScriptRef } from '../../CompatLayout';
import { Script } from '../../CompatLayout';
import styles from '../../styles/CompatFlash.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface RufflePlayerElement extends HTMLElement {
	load(data: { url: string }): void;
	remove(): void;
}

declare const RufflePlayer: {
	newest(): {
		createPlayer(): RufflePlayerElement;
	};
};

const Flash: HolyPage = ({ compatLayout }) => {
	const { t } = useTranslation();
	const container = useRef<HTMLElement | null>(null);
	const ruffleBundle = useRef<ScriptRef | null>(null);
	const [ruffleLoaded, setRuffleLoaded] = useState(false);

	useEffect(() => {
		let player: RufflePlayerElement | undefined;

		(async function () {
			if (!ruffleBundle.current || !container.current) return;

			let errorCause: string | undefined;

			try {
				errorCause = t('compat.failureLoadingBootstrapper');
				await ruffleBundle.current.promise;
				errorCause = undefined;

				const ruffle = RufflePlayer.newest();
				player = ruffle.createPlayer();
				container.current.append(player);

				player.addEventListener('loadeddata', () => {
					setRuffleLoaded(true);
				});

				player.addEventListener('error', (event) => {
					throw event.error;
				});

				player.load({
					url: compatLayout.current!.destination.toString(),
				});
			} catch (err) {
				compatLayout.current!.report(err, errorCause, 'Rammerhead');
			}
		})();

		return () => {
			player?.remove();
		};
	}, [compatLayout, ruffleBundle, t]);

	return (
		<main
			className={styles.main}
			data-loaded={Number(ruffleLoaded)}
			ref={container}
		>
			<Script src="/ruffle/ruffle.js" ref={ruffleBundle} />
			{!ruffleLoaded && t('loading', { what: 'Flash Player' })}
		</main>
	);
};

export default Flash;
