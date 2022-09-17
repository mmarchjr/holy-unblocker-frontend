import type { HolyPage } from '../../../App';
import type {
	CategoryData,
	LoadingCategoryData,
	LoadingTheatreEntry,
	TheatreEntry,
} from '../../../TheatreCommon';
import { ItemList, TheatreAPI } from '../../../TheatreCommon';
import SearchBar from '../../../TheatreSearchBar';
import { ThemeA, ThemeLink } from '../../../ThemeElements';
import { DB_API } from '../../../consts';
import categories from '../../../gameCategories';
import type { Category } from '../../../gameCategories';
import isAbortError from '../../../isAbortError';
import { Obfuscated } from '../../../obfuscate';
import { getHot } from '../../../routes';
import styles from '../../../styles/TheatreCategory.module.scss';
import ArrowForward from '@mui/icons-material/ArrowForward';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const entryLimit = 8;
const loadingCategories: LoadingCategoryData = {
	total: 0,
	entries: [],
	loading: true,
};

for (const category of categories)
	for (let i = 0; i < entryLimit; i++)
		loadingCategories.entries.push({
			id: i.toString(),
			loading: true,
			category: [category.id],
		});

const categoryQuery = categories.map((category) => category.id).join(',');

const Popular: HolyPage = () => {
	const { t } = useTranslation();

	const [data, setData] = useState<LoadingCategoryData | CategoryData>(
		loadingCategories
	);

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const abort = new AbortController();

		(async function () {
			const api = new TheatreAPI(DB_API, abort.signal);

			try {
				const data = await api.category({
					sort: 'plays',
					category: categoryQuery,
					limitPerCategory: entryLimit,
				});

				setData(data);
			} catch (err) {
				if (!isAbortError(err)) {
					console.error(err);
					setError(String(err));
				}
			}
		})();

		return () => abort.abort();
	}, []);

	if (error) {
		return (
			<main className="error">
				<p>
					An error occured when loading popular <Obfuscated>games</Obfuscated>:
				</p>
				<pre>{error}</pre>
				<p>
					Try again by clicking{' '}
					<ThemeA
						href="i:"
						onClick={(event) => {
							event.preventDefault();
							global.location.reload();
						}}
					>
						here
					</ThemeA>
					.
					<br />
					If this problem still occurs, check our{' '}
					<ThemeLink to={getHot('faq').path} target="_parent">
						FAQ
					</ThemeLink>{' '}
					or{' '}
					<ThemeLink to={getHot('contact').path} target="_parent">
						Contact Us
					</ThemeLink>
					.
				</p>
			</main>
		);
	}

	const _categories: Record<
		string,
		{ entries: (TheatreEntry | LoadingTheatreEntry)[]; category: Category }
	> = {};

	for (const category of categories)
		_categories[category.id] = {
			entries: [],
			category: category,
		};

	for (const item of data.entries)
		_categories[item.category[0]].entries.push(item);

	return (
		<main className={styles.main}>
			<SearchBar
				showCategory
				category={categoryQuery}
				placeholder={t('theatre.searchByGame')}
			/>
			{Object.values(_categories).map((section) => {
				return (
					<section className={styles.expand} key={section.category.id}>
						<div className={styles.name}>
							<h1>{t(`gameCategory.${section.category.id}`)}</h1>
							<ThemeLink
								to={`${getHot('theatre games category').path}?id=${
									section.category.id
								}`}
								className={styles.seeAll}
							>
								See All
								<ArrowForward />
							</ThemeLink>
						</div>
						<ItemList
							className={clsx(styles.items, styles.flex)}
							items={section.entries}
						/>
					</section>
				);
			})}
		</main>
	);
};

export default Popular;
