import type { HolyPage } from '../../App';
import { ThemeSelect } from '../../ThemeElements';
import { getLanguage, setLanguage } from '../../i18n';
import styles from '../../styles/Settings.module.scss';

const Appearance: HolyPage = ({ layout }) => {
	return (
		<section>
			<div>
				<span>Language:</span>
				<ThemeSelect
					className={styles.ThemeSelect}
					defaultValue={getLanguage()}
					onChange={(event) => {
						setLanguage(event.target.value);
					}}
				>
					<option value="en">English</option>
					<option value="fr">French</option>
				</ThemeSelect>
			</div>
			<div>
				<span>Theme:</span>
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
					<option value="day">Day</option>
					<option value="night">Night</option>
				</ThemeSelect>
			</div>
		</section>
	);
};

export default Appearance;
