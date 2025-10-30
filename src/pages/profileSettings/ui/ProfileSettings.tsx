import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import styles from './ProfileSettings.module.css';
import { useUserStore } from '@/entities/user/model/store';
import VariantSelection from '@/features/variantSelection/ui/VariantSelection';
import { Button, Input, useCustomTranslation } from '@/shared';
import {
  UpdateProfileParams,
  updateProfile as updateProfileApi } from
'@/shared/api/endpoints/updateProfile';
import GbIco from '@/shared/assets/flags/gb-square.svg?react';
import RuIco from '@/shared/assets/flags/ru-square.svg?react';
import UaIco from '@/shared/assets/flags/ua-square.svg?react';
import DeleteIco from '@/shared/assets/icons/delete.svg?react';
import CameraIco from '@/shared/assets/images/camera.svg?react';
import { AnimatedPage } from '@/shared/hoc/AnimatedPage';
import { NotificationHeaderFactory } from '@/shared/lib/factory/NotificationHeaderFactory';

const AvatarSelector = ({
  avatars,
  onAvatarChange,
  onRemoveAvatar




}: {avatars: (File | null)[];onAvatarChange: (index: number, file: File | null) => void;onRemoveAvatar: (index: number) => void;}) => {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAvatarClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  index: number) =>
  {
    const file = event.target.files?.[0];
    if (file) {
      onAvatarChange(index, file);
    }
  };

  const handleRemoveAvatar = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    onRemoveAvatar(index);
  };

  return (
    <div className='flex gap-3'>
			{[0, 1, 2, 3].map((index) =>
      <div key={index} className='relative'>
					<div
          onClick={() => handleAvatarClick(index)}
          className={`z-1 w-26 h-26 rounded-2xl cursor-pointer flex items-center justify-center ${
          index === 0 ?
          'border-2 border-dashed border-yellow-400 bg-[var(--second-bg)]' :
          avatars[index] ?
          'bg-transparent' :
          'border-2 border-dashed border-gray-500 bg-[var(--second-bg)]'}`
          }>
          
						{avatars[index] ?
          <div className='relative w-full h-full'>
								<img
              src={URL.createObjectURL(avatars[index]!)}
              alt={`Avatar ${index + 1}`}
              className='w-full h-full object-cover rounded-2xl' />
            
								<button
              onClick={(e) => handleRemoveAvatar(index, e)}
              className={`absolute w-6 h-6 border border-red-500 rounded-lg flex items-center justify-center z-10 ${
              index === 0 ? 'bottom-2 right-1' : 'top-21 left-20'}`
              }
              style={{ backdropFilter: 'blur(2px)' }}>
              
									<DeleteIco
                fill='white'
                width={24}
                height={24}
                className='animate-pulse duration-500' />
              
								</button>
								{index === 0 &&
            <div className='absolute inset-0 border-2 border-transparent rounded-2xl pointer-events-none ' />
            }
							</div> :

          <div className='flex flex-col items-center justify-center'>
								<CameraIco />
							</div>
          }
					</div>
					<input
          type='file'
          accept='image/*'
          ref={(el) => {
            fileInputRefs.current[index] = el;
          }}
          onChange={(e) => handleFileChange(e, index)}
          className='hidden' />
        
				</div>
      )}
		</div>);

};




const getAgeRange = (age: string | number): string => {
  const ageNum = typeof age === 'string' ? parseInt(age) : age;
  if (isNaN(ageNum)) return '18-24';

  if (ageNum < 18) return '14-17';
  if (ageNum <= 24) return '18-24';
  if (ageNum <= 30) return '25-30';
  return '30+';
};




const mapSearchType = (
selectedMatchType: string)
: UpdateProfileParams['search_type'] => {
  switch (selectedMatchType) {
    case 'realLife':
      return 'REAL_MEETING';
    case 'online':
      return 'JUST_PLAY';
    default:
      return 'JUST_PLAY';
  }
};




const mapProfileToUpdateParams = (
originalProfile: {
  nickname: string;
  age: string;
  gender: string;
  selectedLanguage: string;
},
currentProfile: ReturnType<typeof useUserStore>['profile'])
: UpdateProfileParams => {
  const updateData: UpdateProfileParams = {};


  if (currentProfile.gender !== originalProfile.gender) {
    updateData.gender = currentProfile.gender || undefined;
  }

  if (currentProfile.age !== originalProfile.age) {
    updateData.age_range = getAgeRange(currentProfile.age);
  }

  if (currentProfile.selectedMatchType) {
    updateData.search_type = mapSearchType(currentProfile.selectedMatchType);
  }


  if (currentProfile.about !== undefined && currentProfile.about !== '') {
    updateData.about = currentProfile.about;
  }


  if (currentProfile.interests && currentProfile.interests.length > 0) {
    updateData.hobbies = currentProfile.interests.join(', ');
  }


  if (
  currentProfile.selectedPlatform &&
  currentProfile.selectedPlatform.length > 0)
  {
    updateData.game_platform = currentProfile.selectedPlatform;
  }


  const searchType = mapSearchType(currentProfile.selectedMatchType);
  if (
  searchType === 'JUST_PLAY' &&
  currentProfile.selectedPrime &&
  currentProfile.selectedPrime.length > 0)
  {
    updateData.activity_time = currentProfile.selectedPrime[0].toUpperCase();
  }

  return updateData;
};

const ProfileSettings = () => {
  const { profile, setProfileField, setUserImage } = useUserStore();

  const [avatars, setAvatars] = useState<(File | null)[]>([
  null,
  null,
  null,
  null]
  );

  const [originalProfile] = useState({
    nickname: profile.nickname,
    age: profile.age,
    gender: profile.gender,
    selectedLanguage: profile.selectedLanguage
  });

  const { title } = useCustomTranslation('profileSettings');
  const validation = useCustomTranslation('profileSettingsValidation');
  const form = useCustomTranslation('profileSettingsForm');
  const { i18n } = useTranslation();
  const [, setError] = useState(null);

  const handleBack = () => {
    setProfileField('nickname', originalProfile.nickname);
    setProfileField('age', originalProfile.age);
    setProfileField('gender', originalProfile.gender);
    setProfileField('selectedLanguage', originalProfile.selectedLanguage);

    window.history.back();
  };

  const validateAge = (age: string | number): boolean => {
    const ageNum = typeof age === 'string' ? parseInt(age) : age;
    return ageNum >= 14 && ageNum <= 80;
  };

  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const handleSave = async () => {
    setError(null);

    if (!profile.nickname || profile.nickname.trim() === '') {
      toast.error(validation.nameEmpty);
      return;
    }

    if (
    !profile.age ||
    profile.age === '' ||
    typeof profile.age === 'number' && profile.age === 0)
    {
      toast.error(validation.ageEmpty);
      return;
    }

    if (!validateName(profile.nickname)) {
      toast.error(validation.nameInvalid);
      return;
    }

    const ageNum =
    typeof profile.age === 'string' ? parseInt(profile.age) : profile.age;
    if (!validateAge(profile.age)) {
      if (ageNum < 14) {
        toast.error(validation.ageMin);
      } else if (ageNum > 80) {
        toast.error(validation.ageMax);
      }
      return;
    }

    try {

      const updateData = mapProfileToUpdateParams(originalProfile, profile);



      await updateProfileApi(updateData);


      setProfileField('nickname', profile.nickname);
      setProfileField('age', profile.age);
      setProfileField('gender', profile.gender);
      setProfileField('selectedLanguage', profile.selectedLanguage);

      localStorage.setItem('selectedLanguage', profile.selectedLanguage);
      toast.success(validation.profileUpdated);
      window.history.back();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || validation.profileUpdateError
        );
      } else {
        toast.error(validation.unknownError);
      }
    }
  };

  const handleAvatarChange = (index: number, file: File | null) => {
    if (!file) return;

    const newAvatars = [...avatars];

    if (index > 0) {
      for (let i = 0; i < index; i++) {
        if (!newAvatars[i]) {
          newAvatars[i] = file;
          setAvatars(newAvatars);

          if (i === 0) {
            setUserImage(file);
          }
          return;
        }
      }
    }

    newAvatars[index] = file;
    setAvatars(newAvatars);

    if (index === 0) {
      setUserImage(file);
    }
  };

  const handleRemoveAvatar = (index: number) => {
    const newAvatars = [...avatars];

    newAvatars[index] = null;

    const filledAvatars = newAvatars.filter((avatar) => avatar !== null);
    const shiftedAvatars = new Array(4).fill(null);

    filledAvatars.forEach((avatar, i) => {
      shiftedAvatars[i] = avatar;
    });

    setAvatars(shiftedAvatars);

    if (index === 0 && shiftedAvatars[0]) {
      setUserImage(shiftedAvatars[0]);
    } else if (index === 0 && !shiftedAvatars[0]) {
      return;
    }
  };

  const handleGenderChange = (gender: string) => {
    setProfileField('gender', gender);
  };

  const handleLanguageChange = (language: string) => {
    setProfileField('selectedLanguage', language);
  };

  const genders = [
  { code: 'MALE', label: form.maleLabel },
  { code: 'FEMALE', label: form.femaleLabel }];


  const languages = [
  { code: 'ru', label: 'Русский', icon: RuIco },
  { code: 'ua', label: 'Український', icon: UaIco },
  { code: 'en', label: 'English', icon: GbIco }];


  const InputData = [
  {
    label: form.nameLabel,
    type: 'text',
    name: 'name',
    value: profile.nickname || '',
    onChange: (value: string) => setProfileField('nickname', value),
    placeholder: form.namePlaceholder,
    labelSize: 'text-lg',
    labelColor: 'text-white'
  },
  {
    label: form.ageLabel,
    type: 'number',
    name: 'age',
    placeholder: form.agePlaceholder,
    value: profile.age,
    onChange: (value: string) => {
      if (value === '' || value === '0') {
        setProfileField('age', value);
        return;
      }

      const ageNum = parseInt(value);

      if (!isNaN(ageNum) && ageNum <= 80) {
        setProfileField('age', value);
      }
    },
    notification: form.ageNotification,
    labelSize: 'text-lg',
    labelColor: 'text-white'
  }];


  useEffect(() => {
    if (i18n.language !== profile.selectedLanguage) {
      i18n.changeLanguage(profile.selectedLanguage);
    }
  }, [profile.selectedLanguage, i18n.language, i18n]);

  return (
    <div className='h-full relative overflow-scroll flex flex-col pb-20'>
			<div className='flex-1 p-4 px-4 flex flex-col gap-7.5'>
				<NotificationHeaderFactory
          title={title}
          IsBack={true}
          notification={false} />
        

				<div>
					<h3 className={styles.subtitle}>{form.avatarLabel}</h3>
					<AvatarSelector
            avatars={avatars}
            onAvatarChange={handleAvatarChange}
            onRemoveAvatar={handleRemoveAvatar} />
          
				</div>

				{InputData.map((item, index) =>
        <Input key={index} data={item} />
        )}

				<div>
					<div className='flex items-center gap-2 mb-3'>
						<h3 className={styles.subtitle}>{form.genderLabel}</h3>
					</div>
					<VariantSelection
            variant='row'
            data={genders}
            selected={profile.gender || ''}
            onSelect={(value) => handleGenderChange(value as string)} />
          
				</div>

				<div>
					<h3 className={styles.subtitle}>{form.languageLabel}</h3>
					<VariantSelection
            data={languages}
            selected={profile.selectedLanguage}
            onSelect={(value) => handleLanguageChange(value as string)} />
          
				</div>
			</div>

			<div className={`flex w-full gap-4 mt-8 ${styles.buttons}`}>
				<Button variant='secondary' onClick={handleBack} type='submit'>
					{form.cancelButton}
				</Button>
				<Button variant='accept' onClick={handleSave}>
					{form.saveButton}
				</Button>
			</div>
		</div>);

};

export default AnimatedPage(ProfileSettings);