import type { HolyPage } from '../../App';
import type { ScriptRef } from '../../CompatLayout';
import { Script } from '../../CompatLayout';
import { BARE_API, SERVICEWORKERS } from '../../consts';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface StompBootConfig {
	bare_server: string;
	directory: string;
	loglevel: number;
	codec: number;
}

declare class StompBoot {
	static readonly CODEC_PLAIN: number;
	static readonly CODEC_XOR: number;
	static readonly LOG_DEBUG: number;
	static readonly LOG_ERROR: number;
	static readonly LOG_INFO: number;
	static readonly LOG_SILENT: number;
	static readonly LOG_TRACE: number;
	static readonly LOG_WARN: number;
	constructor(config: StompBootConfig);
	html(url: string): string;
	ready: Promise<void>;
}

const Stomp: HolyPage = ({ compatLayout }) => {
	const { t } = useTranslation();

	const bootstrapper = useRef<ScriptRef | null>(null);

	useEffect(() => {
		(async function () {
			if (!compatLayout.current || !bootstrapper.current) return;

			let errorCause: string | undefined;

			try {
				if (!SERVICEWORKERS) {
					errorCause = t('compat.error.swHTTPS');
					throw new Error(errorCause);
				}

				if (!('serviceWorker' in navigator)) {
					errorCause = t('compat.error.swSupport');
					throw new Error(errorCause);
				}

				errorCause = t('compat.error.genericBootstrapper');
				await bootstrapper.current.promise;
				errorCause = undefined;

				const config = {
					bare_server: BARE_API,
					directory: '/stomp/',
				} as Partial<StompBootConfig>;

				if (process.env.NODE_ENV === 'development') {
					config.loglevel = StompBoot.LOG_TRACE;
					config.codec = StompBoot.CODEC_PLAIN;
				} else {
					config.loglevel = StompBoot.LOG_ERROR;
					config.codec = StompBoot.CODEC_XOR;
				}

				const boot = new StompBoot(config as StompBootConfig);

				errorCause = t('compat.error.registeringSW');
				await boot.ready;
				errorCause = undefined;

				errorCause = t('compat.error.bareServer');
				{
					const bare = await fetch(BARE_API);
					if (!bare.ok) {
						throw await bare.json();
					}
				}
				errorCause = undefined;

				global.location.replace(boot.html(compatLayout.current.destination));
			} catch (err) {
				compatLayout.current.report(err, errorCause, 'Stomp');
			}
		})();
	}, [compatLayout, bootstrapper, t]);

	return (
		<main>
			<Script src="/stomp/bootstrapper.js" ref={bootstrapper} />
			{t('compat.loading', { what: 'Stomp' })}
		</main>
	);
};

export default Stomp;
