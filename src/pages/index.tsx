import type { HolyPage } from '../App';
import { ThemeButton } from '../ThemeElements';
import { Obfuscated } from '../obfuscate';
import styles from '../styles/Home.module.scss';
import { useTranslation } from 'react-i18next';

const Home: HolyPage = ({ mainLayout }) => {
	const { t } = useTranslation();

	return (
		<main className={styles.main}>
			<h1>
				<Obfuscated>{t('landingTitle')}</Obfuscated>
			</h1>
			<h2>
				<Obfuscated>{t('landingCaption')}</Obfuscated>
			</h2>
			<ThemeButton
				className={styles.button}
				onClick={() => mainLayout.current!.setExpanded(true)}
			>
				<Obfuscated>{t('getStarted')}</Obfuscated>
			</ThemeButton>
		</main>
	);
};

export default Home;
