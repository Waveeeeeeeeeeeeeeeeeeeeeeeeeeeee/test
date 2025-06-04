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
import { getProfileByTelegramId } from '@/5.entities/user/api/getProfileByTelegramId'

export const useMainApp = () => {
  const [isReady, setIsReady] = useState(false)
  const [shouldRedirectToOnboarding, setShouldRedirectToOnboarding] = useState<boolean | null>(null)
  const [minLoadingPassed, setMinLoadingPassed] = useState(false)

  const { i18n } = useTranslation()
  const { setTelegramUser, setUserHash } = useUserStore()

  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingPassed(true), 5000)

    const initApp = async () => {
      try {
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

        const languageCodeFromLs = localStorage.getItem('language_code')
        if (languageCodeFromLs) {
          i18n.changeLanguage(languageCodeFromLs)
        } else {
          const languageCode = initDataUser()?.language_code
          if (languageCode === 'ru') i18n.changeLanguage('ru')
        }

        const userId = tgWebAppData?.user?.id
        if (userId) {
          const profile = await getProfileByTelegramId(userId.toString())
		  console.log(profile)
          setShouldRedirectToOnboarding(!profile)
        } else {
          setShouldRedirectToOnboarding(true)
        }
      } catch (e) {
        console.error('Ошибка инициализации:', e)
        setShouldRedirectToOnboarding(true)
      } finally {
        setIsReady(true)
      }
    }

    initApp()

    return () => clearTimeout(timer)
  }, [])

  return {
    showContent: minLoadingPassed && isReady && shouldRedirectToOnboarding !== null,
    shouldRedirectToOnboarding
  }
}