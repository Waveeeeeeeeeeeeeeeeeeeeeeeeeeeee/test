import { UserProfile } from '@/entities/user/model/types';

export type TPersonPreview = Pick<
  UserProfile,
  'nickname' | 'image' | 'country_code' | 'age' | 'interests' | 'about'> &

Partial<UserProfile>;