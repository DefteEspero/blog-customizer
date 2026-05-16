import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useEffect, useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const handleArrowClick = () => {
		setIsOpen((currentIsOpen) => !currentIsOpen);
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				isOpen &&
				event.target instanceof Node &&
				!formRef.current?.contains(event.target)
			) {
				setIsOpen(false);
			}
		};

		const handleEscClick = (event: KeyboardEvent) => {
			if (isOpen && event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('keydown', handleEscClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<Select
						title='Шрифт'
						selected={defaultArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={() => {}}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						selected={defaultArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={() => {}}
					/>

					<Select
						title='Цвет шрифта'
						selected={defaultArticleState.fontColor}
						options={fontColors}
						onChange={() => {}}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={defaultArticleState.backgroundColor}
						options={backgroundColors}
						onChange={() => {}}
					/>

					<Select
						title='Ширина контента'
						selected={defaultArticleState.contentWidth}
						options={contentWidthArr}
						onChange={() => {}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
