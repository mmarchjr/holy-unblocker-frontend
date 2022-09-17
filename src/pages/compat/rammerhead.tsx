import type { HolyPage } from '../../App';
import { RammerheadAPI, StrShuffler } from '../../RammerheadAPI';
import { RH_API } from '../../consts';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Rammerhead: HolyPage = ({ compatLayout }) => {
	const { t } = useTranslation();

	useEffect(() => {
		(async function () {
			let errorCause: string | undefined;

			try {
				const api = new RammerheadAPI(RH_API);

				// according to our NGINX config
				if (process.env.NODE_ENV === 'production')
					Cookies.set('auth_proxy', '1', {
						domain: `.${global.location.host}`,
						expires: 1000 * 60 * 60 * 24 * 7, // 1 week
						secure: global.location.protocol === 'https:',
						sameSite: 'lax',
					});

				errorCause = t('compat.rammerheadUnreachable');
				await fetch(RH_API);
				errorCause = undefined;

				errorCause = t('compat.rammerheadSavedSession');
				if (
					!localStorage.rammerhead_session ||
					!(await api.sessionExists(localStorage.rammerhead_session))
				) {
					errorCause = t('compat.rammerheadNewSession');
					const session = await api.newSession();
					errorCause = undefined;
					localStorage.rammerhead_session = session;
				}

				const session = localStorage.rammerhead_session;

				errorCause = undefined;

				errorCause = t('compat.rammerheadEditSession');
				await api.editSession(session, false, true);
				errorCause = undefined;

				errorCause = t('compat.rammerheadDict');
				const dict = await api.shuffleDict(session);
				errorCause = undefined;

				const shuffler = new StrShuffler(dict);

				global.location.replace(
					new URL(
						`${session}/${shuffler.shuffle(compatLayout.current!.destination)}`,
						RH_API
					)
				);
			} catch (err) {
				compatLayout.current!.report(err, errorCause, 'Rammerhead');
			}
		})();
	}, [compatLayout, t]);

	return <main>{t('compat.loading', { what: 'Rammerhead' })}</main>;
};

export default Rammerhead;
