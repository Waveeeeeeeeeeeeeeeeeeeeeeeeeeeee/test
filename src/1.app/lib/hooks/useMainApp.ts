import {
	expandViewport,
	init,
	initDataUser,
	restoreInitData,
	swipeBehavior
} from '@telegram-apps/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useMainApp = () => {
	const [isShowApp, setIsShowApp] = useState(false)
	const [isAppLoaded, setIsAppLoaded] = useState(false)
	const { i18n } = useTranslation()

	useEffect(() => {
		init()
		restoreInitData()
		expandViewport()
		swipeBehavior.mount()
		swipeBehavior.disableVertical()
		// document.body.style.height = `${window.innerHeight * 1.5}px`
	}, [])

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsShowApp(true)
		}, 6000)

		return () => clearTimeout(timer)
	}, [])

	useEffect(() => {
		const languageCodeFromLs = localStorage.getItem('language_code')
		if (languageCodeFromLs) {
			i18n.changeLanguage(languageCodeFromLs)
		} else {
			const languageCode = initDataUser()?.language_code
			if (languageCode === 'ru') i18n.changeLanguage('ru')
		}
	}, [])

	const handleAppLoaded = () => {
		setIsAppLoaded(true)
	}

	return { handleAppLoaded, isAppLoaded, isShowApp }
}
