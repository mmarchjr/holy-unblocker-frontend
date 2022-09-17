import type { HolyPage } from '../App';
import { ObfuscatedThemeA, ThemeLink } from '../ThemeElements';
import { TN_DISCORD_URL } from '../consts';
import { Obfuscated } from '../obfuscate';
import { getHot } from '../routes';
import type { ReactElement, ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const WebsiteAIOLink = ({ children }: { children?: ReactNode }) => (
	<ObfuscatedThemeA href="https://github.com/holy-unblocker/website-aio#website-aio">
		{children}
	</ObfuscatedThemeA>
);

const TNInviteLink = ({ children }: { children?: ReactNode }) => (
	<ObfuscatedThemeA href={TN_DISCORD_URL}>
		<Obfuscated>{children}</Obfuscated>
	</ObfuscatedThemeA>
);

const GitLink = ({ children }: { children?: ReactNode }) => (
	<ObfuscatedThemeA href="https://git.holy.how/holy/website">
		{children}
	</ObfuscatedThemeA>
);

const ContactLink = ({ children }: { children?: ReactNode }) => (
	<ThemeLink to={getHot('contact').path}>{children}</ThemeLink>
);

const PrivacyLink = ({ children }: { children?: ReactNode }) => (
	<ThemeLink to={getHot('privacy').path}>{children}</ThemeLink>
);

const FAQ: HolyPage = () => {
	const { t } = useTranslation();

	// <0> = obfuscated always

	return (
		<main>
			{(
				[
					['selfhost', [<WebsiteAIOLink />]],
					['morelinks', [<TNInviteLink />]],
					['source', [<GitLink />]],
					['secure', [<PrivacyLink />]],
				] as [faq: string, components: ReactElement[]][]
			).map(([faq, components]) => (
				<section key={faq}>
					<h1>
						<Obfuscated>{t(`faq.list.${faq}.q`)}</Obfuscated>
					</h1>
					<p>
						<Trans
							i18nKey={`faq.list.${faq}.a`}
							components={[<Obfuscated />, ...components]}
						/>
					</p>
				</section>
			))}
			<p style={{ marginTop: 30, opacity: 0.75 }}>
				<Trans i18nKey={`faq.contact`} components={[<ContactLink />]} />
			</p>
		</main>
	);
};

export default FAQ;
