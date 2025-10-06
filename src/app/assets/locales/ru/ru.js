import { a } from '@react-spring/web';

const ru = {
	translation: {
		Onboarding: {
			backButton: 'Назад',
			nextButton: 'Продолжить'
		},
		onboardingChooseLanguage: {
			title: 'Мы рады тебя видеть!',
			desription: `Выбери язык, на котором ты хочешь продолжить`
		},
		onboardingChooseGame: {
			title: 'Укажи свои любимые игры',
			searchHolder: 'Поиск'
		},
		onboardingChoosePlatform: {
			title: 'Выбери основную платформу'
		},
		gameImageUpload: {
			upload: 'Добавить фото'
		},
		onboardingChoosePerson: {
			title: `Выбери для чего ты хочешь найти человека`,
			title2: `Где вы проживаете?`,
			placeholderCountry: `Найти страну`,
			placeholderCity: `Найти город`,
			labelCountry: `Страна проживания`,
			labelCity: `Город проживания`,
			description: `Это очень важный пункт, требуется чуть больше <br /> ‼️ВНИМАНИЯ‼️, ведь
				в зависимости от того, что ты выберешь, будет 2 варианта событий:`,
			label1: `Человека из реальной жизни`,
			secLabel1: `поиск человека с твоего города, который играет в такие же игры`,
			secLabel2: `поиск тиммейта из любой страны!`,
			label2: `Просто поиграть`
		},
		onboardingRules: {
			title: `Правила использования`,
			numeric1: `Анкеты с прокачкой, обменом и продажей аккаунтов - скам, который немедленно улетает в бан. (Ты ведь знаешь, что лучший сервис для прокачки`,
			numeric2: `Запрещено просить других пользователей повысить вашу популярность – за это грозит блокировка.`,
			numeric3: `Мы любим людей за поступки, а не за их национальность! 🇷🇺+🇺🇦 = 🫂 Любые нападки на любую сторону будут караться баном! Люди ≠ правительство! Также запрещена пропаганда алкоголя, сигарет, котиков!`,
			button: `Принять правила`,
			declineButton: `Отказаться`
		},
		accountInfo: {
			backButton: 'Назад',
			nextButton: 'Далее'
		},

		onboardingAboutMe: {
			title: 'Расскажи о себе',
			label: 'Ваш никнейм',
			save: 'Сохранить',
			cancel: 'Отмена',
			min: 'Минимум 6 символов',
			complete: 'Нажмите "Сохранить" чтобы завершить',
			yourAge: 'Сколько тебе лет?',
			ageVariation1: 'лет',
			ageVariation2: 'года',
			minAge: 'Возраст должен быть от 14 лет',
			labelRealLife: 'Описание вашей реальной жизни',
			labelOnline: 'Описание вашей виртуальной жизни',
			placeholder: 'Пару слов о себе',
			char: 'символов'
		},
		onboardingChooseCountry: {
			title: 'Выбор стран',
			subtitle: 'Выбери страны геймеров, с кем ты бы хотел познакомиться',
			placeholder: 'Введите название страны',
			label: 'Введите страну',
			save: 'Сохранить',
			add: 'Добавить еще'
		},
		onboardingChooseGoal: {
			title: 'Выбери цель игр',
			labelJustPlay: 'Просто поиграть',
			labelConquerer: 'Завоеватель',
			labelTdm: 'TDM',
			labelUltimateRoyal: 'Королевская битва',
			labelSnuggle: 'Праки',
			labelDuo: 'Дуо',
			labelWow: 'WoW'
		},
		onboardingChoosePrime: {
			title: 'Время основной активности',
			labelMorning: 'Утро (6:00 - 12:00)',
			labelAfternoon: 'День (12:00 - 18:00)',
			labelEvening: 'Вечер (18:00 - 00:00)',
			labelNight: 'Ночь (00:00 - 6:00)'
		},
		photoContainer: {
			title: 'Загрузите фотографию',
			subtitle: 'Размер не должен превышать 10 мб'
		},
		dropDown: {
			placeholder: 'Выбрать'
		},
		targetSearchList: {
			justPlayTxt: 'Просто поиграть',
			conquerorTxt: 'Завоеватель',
			praksTxt: 'Праки',
			duoTxt: 'Дуо'
		},
		bottomBar: {
			label1: 'Главная',
			label2: 'Поиск',
			label3: 'Друзья',
			label4: 'Профиль'
		},
		statusFilter: {
			label1: 'Сейчас в сети',
			label2: 'Оффлайн'
		},
		skipButton: {
			text: 'Пропустить'
		},
		messageButton: {
			text: 'Написать'
		},
		inviteButton: {
			text: 'Пригласить'
		},
		userFiltersModal: {
			scope1: 'По городу',
			scope2: 'По стране',
			scope3: 'По миру',
			button1: `Парень`,
			button2: `Девушка`,
			mainTitle: 'Фильтры',
			subtitle1: 'Выбрать игру',
			subtitle2: 'Поиск по полу',
			subtitle3: 'Местоположение',
			backButton: 'Назад',
			acceptButton: 'Применить'
		},
		friends: {
			title: 'Друзья'
		},
		profile: {
			online: 'Просто поиграть',
			realLife: 'Реальная встеча',
			games: 'Ваши игры',
			games_description: 'Изменить список игры и целей',
			settings: 'Настройки профиля',
			settings_description: 'Личная информация, описание теги',
			support: 'Обратиться в поддержку',
			support_description: 'Личная информация, описание теги',
			rules: 'Правила пользования',
			rules_description: 'Личная информация, описание теги',
			privacy: 'Политика конфиденциальности',
			privacy_description: 'Личная информация, описание теги'
		},
		profileSettings: {
			title: 'Настройки профиля',
			backBtn: 'Назад',
			saveBtn: 'Сохранить'
		},
		profileGames: {
			title: 'Ваши игры',
			subtitle: 'Добавить игру'
		},
		profileSupport: {
			title: 'Обращение в поддержку',
			messageTitle: 'Выберите тему обращения',
			problemTitle: 'Опишите проблему',
			problemDesc: 'Дайте подробное описание вопроса'
		}
	}
};

export default ru;
