import { useUserStore } from '@/5.entities/user/model/store'
import {
	expandViewport,
	init,
	initDataUser,
	restoreInitData,
	swipeBehavior,
	retrieveLaunchParams
} from '@telegram-apps/sdk'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useMainApp = () => {
	const [isShowApp, setIsShowApp] = useState(false)
	const [isAppLoaded, setIsAppLoaded] = useState(false)
	const { i18n } = useTranslation()
	const {setTelegramUser, setUserHash} = useUserStore()


	useEffect(() => {
		init()
		restoreInitData()
		expandViewport()
		swipeBehavior.mount()
		swipeBehavior.disableVertical()
	
		const { tgWebAppData } = retrieveLaunchParams()
	
		if (tgWebAppData?.user && !useUserStore.getState().user) {
			setUserHash(tgWebAppData.hash)
			setTelegramUser(tgWebAppData.user)
		}
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
