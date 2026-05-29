# Blog Customizer

Интерактивная страница статьи с панелью настройки внешнего вида.  
Проект позволяет менять параметры отображения статьи: шрифт, размер текста, цвет текста, цвет фона и ширину контента. Настройки сначала изменяются внутри формы, а к статье применяются только после нажатия кнопки «Применить».

# Репозиторий

- https://github.com/DefteEspero/blog-customizer

## Макет проекта

Проект выполнен по макету Figma:

```text
https://www.figma.com/file/FEeiiGLOsE7ktXbPpBxYoD/Custom-dropdown
```

## Стек

- React
- TypeScript
- SCSS Modules
- Webpack
- Storybook
- ESLint
- Stylelint
- Prettier

## Возможности

- Открытие и закрытие боковой панели настроек.
- Закрытие панели по клику вне формы.
- Закрытие панели по клавише `Escape`.
- Изменение параметров статьи через форму.
- Отдельное состояние формы и применённых настроек статьи.
- Применение настроек только после нажатия кнопки «Применить».
- Сброс настроек к начальному состоянию по кнопке «Сбросить».
- Изменение стилей статьи через CSS-переменные.
- Переиспользуемые UI-компоненты: `Select`, `RadioGroup`, `Button`, `ArrowButton`, `Text`.

## Запуск проекта

Установить зависимости:

```bash
npm install
```

Запустить проект в режиме разработки:

```bash
npm run start
```

Собрать проект:

```bash
npm run build
```

Запустить Storybook:

```bash
npm run storybook
```

## Проверка кода

Запуск ESLint с автоисправлением:

```bash
npm run lint
```

Проверка SCSS:

```bash
npm run stylelint
```

Автоисправление SCSS:

```bash
npm run stylelint:fix
```

Форматирование кода:

```bash
npm run format
```

Комплексная проверка перед коммитом:

```bash
npm run test
```

## Структура проекта

```txt
src/
  components/
    app/
      app.tsx
      app.module.scss
    article/
      Article.tsx
      Article.module.scss
      index.tsx
    article-params-form/
      ArticleParamsForm.tsx
      ArticleParamsForm.module.scss
      index.tsx
  constants/
    articleProps.ts
  fonts/
    font.scss
  images/
  styles/
    index.scss
  ui/
    arrow-button/
    button/
    radio-group/
    select/
    separator/
    story-decorator/
    text/
  index.tsx
```

## Основная логика

Приложение состоит из двух основных частей:

- `ArticleParamsForm` — боковая панель с настройками статьи;
- `Article` — отображение статьи, к которой применяются выбранные параметры.

Главный компонент `App` хранит применённое состояние статьи и передаёт его в CSS-переменные:

```tsx
<main
  style={{
    '--font-family': articleState.fontFamilyOption.value,
    '--font-size': articleState.fontSizeOption.value,
    '--font-color': articleState.fontColor.value,
    '--container-width': articleState.contentWidth.value,
    '--bg-color': articleState.backgroundColor.value,
  } as CSSProperties}
>
```

Компонент формы хранит собственное локальное состояние. Благодаря этому изменения в полях формы не влияют на статью сразу. Новые параметры применяются только после отправки формы.

## Состояние приложения

В проекте используются два уровня состояния.

### Применённое состояние статьи

Хранится в компоненте `App`:

```ts
const [articleState, setArticleState] =
	useState<ArticleStateType>(defaultArticleState);
```

Это состояние управляет CSS-переменными и влияет на внешний вид статьи.

### Временное состояние формы

Хранится внутри `ArticleParamsForm`:

```ts
const [formState, setFormState] = useState<ArticleStateType>(articleState);
```

Это состояние меняется при выборе новых значений в форме, но не применяется к статье до нажатия кнопки «Применить».

## Компоненты

### `App`

Корневой компонент приложения.

Задачи:

- хранит применённые параметры статьи;
- передаёт параметры в CSS-переменные;
- отображает форму настроек и статью;
- передаёт в форму обработчик изменения применённого состояния.

Основные данные:

```ts
articleState: ArticleStateType;
setArticleState: Dispatch<SetStateAction<ArticleStateType>>;
```

### `ArticleParamsForm`

Компонент боковой панели с настройками статьи.

Задачи:

- открывает и закрывает сайдбар;
- хранит временное состояние формы;
- обновляет поля формы при выборе значений;
- применяет настройки к статье при submit;
- сбрасывает настройки к `defaultArticleState`;
- закрывает панель по клику вне формы;
- закрывает панель по клавише `Escape`.

Props:

```ts
type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onChangeArticleState: (state: ArticleStateType) => void;
};
```

Ключевые обработчики:

- `handleArrowClick` — открывает или закрывает сайдбар;
- `handleFieldChange` — обновляет отдельное поле формы;
- `handleSubmit` — применяет параметры формы к статье;
- `handleReset` — сбрасывает форму и статью к начальному состоянию.

### `Article`

Компонент статьи.

Задачи:

- отображает заголовок, подзаголовок, изображение и текст статьи;
- использует компонент `Text` для типографики;
- получает стили через CSS-переменные, заданные в `App`.

### `Select`

Переиспользуемый компонент выпадающего списка.

Используется для выбора:

- шрифта;
- цвета текста;
- цвета фона;
- ширины контента.

Props:

```ts
type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
};
```

Особенности:

- хранит состояние открытия списка;
- закрывается по клику вне компонента;
- поддерживает выбор через обработчик `onChange`;
- отображает выбранное значение;
- для вариантов шрифта использует дополнительные классы.

### `RadioGroup`

Компонент группы радиокнопок.

Используется для выбора размера шрифта.

Props:

```ts
type RadioGroupProps = {
	name: string;
	options: OptionType[];
	selected: OptionType;
	onChange?: (value: OptionType) => void;
	title: string;
};
```

### `Button`

Компонент кнопки.

Используется для кнопок:

- «Применить»;
- «Сбросить».

Props:

```ts
type ButtonProps = {
	title: string;
	onClick?: () => void;
	htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	type: 'apply' | 'clear';
};
```

### `ArrowButton`

Кнопка открытия и закрытия панели настроек.

Props:

```ts
type ArrowButtonProps = {
	isOpen: boolean;
	onClick: () => void;
};
```

Особенности:

- меняет внешний вид в зависимости от `isOpen`;
- содержит `role`, `aria-label` и `tabIndex` для интерактивного поведения.

### `Text`

Компонент для унифицированного вывода текста.

Задачи:

- позволяет выбрать HTML-тег через `as`;
- управляет размером, весом, стилем и выравниванием текста;
- поддерживает динамические стили статьи;
- используется в статье и UI-компонентах.

Props:

```ts
type TextProps = {
	children: ReactNode;
	as?: ElementType;
	dynamic?: boolean;
	size?: 12 | 18 | 22 | 25 | 31 | 38 | 45;
	weight?: 400 | 800;
	fontStyle?: 'italic' | 'normal';
	uppercase?: boolean;
	align?: 'center' | 'left';
	family?: FontFamiliesClasses;
	dynamicLite?: boolean;
};
```

## Типы и константы

Основные типы и настройки находятся в файле:

```txt
src/constants/articleProps.ts
```

### `OptionType`

Универсальный тип варианта выбора для `Select` и `RadioGroup`.

```ts
export type OptionType = {
	title: string;
	value: string;
	className: string;
	optionClassName?: string;
};
```

### `ArticleStateType`

Тип состояния статьи формируется от объекта `defaultArticleState`:

```ts
export type ArticleStateType = typeof defaultArticleState;
```

### `defaultArticleState`

Начальное состояние статьи:

```ts
export const defaultArticleState = {
	fontFamilyOption: fontFamilyOptions[0],
	fontColor: fontColors[0],
	backgroundColor: backgroundColors[0],
	contentWidth: contentWidthArr[0],
	fontSizeOption: fontSizeOptions[0],
};
```

## Доступные настройки статьи

### Шрифт

- Open Sans
- Ubuntu
- Cormorant Garamond
- Days One
- Merriweather

### Размер шрифта

- 18px
- 25px
- 38px

### Цвет текста

- чёрный;
- белый;
- серый;
- розовый;
- ярко-розовый;
- жёлтый;
- зелёный;
- голубой;
- фиолетовый.

### Цвет фона

- белый;
- чёрный;
- серый;
- розовый;
- ярко-розовый;
- жёлтый;
- зелёный;
- голубой;
- фиолетовый.

### Ширина контента

- широкая;
- узкая.

## Работа CSS-переменных

Параметры статьи применяются через CSS-переменные, которые задаются на корневом элементе `main`:

```scss
--font-family
--font-size
--font-color
--container-width
--bg-color
```

Компоненты статьи используют эти переменные в стилях. Это позволяет менять внешний вид страницы без прямой работы с DOM.

## Пользовательский сценарий

1. Пользователь нажимает на стрелку.
2. Открывается боковая панель настроек.
3. Пользователь меняет значения в `Select` и `RadioGroup`.
4. Временное состояние формы обновляется, но статья не меняется.
5. Пользователь нажимает «Применить».
6. `ArticleParamsForm` передаёт новое состояние в `App`.
7. `App` обновляет CSS-переменные.
8. Статья получает новые стили.

При нажатии «Сбросить» форма и статья возвращаются к `defaultArticleState`.

## Что отработано в проекте

В проекте отработаны:

- работа с React-компонентами;
- управление состоянием через `useState`;
- разделение временного состояния формы и применённого состояния страницы;
- типизация props и состояния в TypeScript;
- композиция компонентов;
- использование CSS Modules;
- применение CSS-переменных из React;
- обработка событий формы;
- закрытие интерфейсного блока по клику вне элемента;
- закрытие интерфейсного блока по клавише `Escape`;
- настройка проекта на Webpack;
- работа со Storybook для UI-компонентов.

## Возможные улучшения

- Переименовать часть переменных и функций для большей единообразности.
- Добавить сохранение выбранных настроек в `localStorage`.
- Добавить анимацию закрытия выпадающих списков.
- Расширить Storybook-сценарии для формы настроек.
- Добавить тесты для пользовательских сценариев.
- Улучшить доступность управления с клавиатуры для всех интерактивных элементов.
