import { create } from 'zustand'
import { UserProfile } from '@/5.entities/user/model/types'
import { completeOnboarding } from '../lib/completeOnboarding'

type State = {
  isLoading: boolean
  error: string | null
  isSuccess: boolean
  userId: number | null
  profileId: number | null
  submit: (profile: UserProfile & {
    telegramId: number
    pushToken: string
    serviceId: number
  }) => Promise<void>
}

export const useOnboarding = create<State>((set) => ({
  isLoading: false,
  error: null,
  isSuccess: false,
  userId: null,
  profileId: null,
  submit: async (profile) => {
    set({ isLoading: true, error: null })
    try {
      const { userId, profileId } = await completeOnboarding(profile)
      set({
        isLoading: false,
        isSuccess: true,
        userId,
        profileId,
      })
    } catch (e: any) {
      set({
        isLoading: false,
        error: e.message || 'Ошибка при онбординге',
      })
    }
  }
}))
