import type { HolyPage } from '../../App';
import { ThemeSelect } from '../../ThemeElements';
import type { i18nLanguage } from '../../i18n';
import { getLanguage, setLanguage } from '../../i18n';
import styles from '../../styles/Settings.module.scss';
import { useTranslation } from 'react-i18next';

const Appearance: HolyPage = ({ layout }) => {
	const { t } = useTranslation();

	return (
		<section>
			<div>
				<span>{t('settings.language')}:</span>
				<ThemeSelect
					className={styles.ThemeSelect}
					defaultValue={getLanguage()}
					onChange={(event) => {
						setLanguage(event.target.value as i18nLanguage);
					}}
				>
					<option value="en-US">English</option>
					<option value="fr">French</option>
				</ThemeSelect>
			</div>
			<div>
				<span>{t('settings.theme')}:</span>
				<ThemeSelect
					className={styles.ThemeSelect}
					defaultValue={layout.current!.settings.theme}
					onChange={(event) => {
						layout.current!.setSettings({
							...layout.current!.settings,
							theme: event.target.value,
						});
					}}
				>
					<option value="day">{t('settings.themeDay')}</option>
					<option value="night">{t('settings.themeNight')}</option>
				</ThemeSelect>
			</div>
		</section>
	);
};

export default Appearance;
