import { useEffect, useRef, useState } from 'react';

import { genderDetermining } from '../api/genderDetermining';
import { qualityOfDescription } from '../api/qualityOfDescription';

import styles from './OnboardingAboutMe.module.css';
import { useUserStore } from '@/entities/user/model/store';
import { useCustomTranslation } from '@/shared';
import { Input } from '@/shared';
import { validateNickname } from '@/shared/lib/validation/validateNickname';
import PhotoContainer from '@/shared/ui/PhotoContainer/PhotoContainer';
import { QualityDescriptionIndicator } from '@/shared/ui/QualityDescriptionIndicator/QualityDescriptionIndicator';
import { TextArea } from '@/shared/ui/TextArea';

const OnboardingAboutMe = () => {
  const { profile, setProfileField, setUserImage, user } = useUserStore();
  const selectedMatchType = useUserStore(
    (state) => state.profile.selectedMatchType
  );
  const {
    title,
    label,
    labelRealLife,
    labelOnline,
    placeholder,
    char,
    save,
    cancel,
    complete,
    yourAge,
    minAge,
    ageVariation1,
    ageVariation2
  } = useCustomTranslation('onboardingAboutMe');
  const [reqChangeNickname, setReqChangeNickname] = useState(true);
  const [previousNickname, setPreviousNickname] = useState(profile.nickname);
  const [nicknameError, setNicknameError] = useState<string>('');
  const controllerRef = useRef<AbortController | null>(null);
  const genderControllerRef = useRef<AbortController | null>(null);

  const handleNicknameChange = (value: string) => {
    setProfileField('nickname', value);
    const validation = validateNickname(value);
    setNicknameError(validation.isValid ? '' : validation.message || '');
  };

  const handleSaveNickname = () => {
    const validation = validateNickname(profile.nickname);
    if (validation.isValid) {
      setReqChangeNickname(false);
      setPreviousNickname(profile.nickname);
      setNicknameError('');
    } else {
      setNicknameError(validation.message || '');
    }
  };

  useEffect(() => {
    if (user?.username && !profile.nickname) {
      setProfileField('nickname', user.username);
    }
  }, [user?.username, profile.nickname, setProfileField]);

  useEffect(() => {
    const nickname = profile.nickname?.trim();
    const description = profile.about?.trim();

    genderControllerRef.current?.abort();

    if (!nickname || !description) {
      return;
    }

    const controller = new AbortController();
    genderControllerRef.current = controller;

    const debounceReq = setTimeout(async () => {
      try {
        const res = await genderDetermining(
          {
            nickname: nickname,
            description: description
          },
          controller.signal
        );

        if (res.data !== undefined && res.data !== null) {
          let genderValue;
          if (typeof res.data === 'number') {
            genderValue =
            res.data === 1 ? 'FEMALE' : res.data === 0 ? 'MALE' : null;
          } else if (typeof res.data.gender === 'number') {
            genderValue =
            res.data.gender === 1 ?
            'FEMALE' :
            res.data.gender === 0 ?
            'MALE' :
            null;
          } else if (typeof res.data.gender === 'string') {
            genderValue = res.data.gender;
          }

          if (genderValue) {
            setProfileField('gender', genderValue);
          }
        }
      } catch (err) {}
    }, 2000);

    return () => {
      clearTimeout(debounceReq);
      controller.abort();
    };
  }, [profile.nickname, profile.about, setProfileField]);

  useEffect(() => {
    const text = profile.about?.trim();

    controllerRef.current?.abort();

    if (!text) {
      setProfileField?.('qualityOfDescription', -4);
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const debounceReq = setTimeout(async () => {
      try {
        const res = await qualityOfDescription({ description: text });
        setProfileField?.('qualityOfDescription', res.data.evaluation);
      } catch (err) {}
    }, 2000);

    return () => {
      clearTimeout(debounceReq);
      controller.abort();
    };
  }, [profile.about]);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      genderControllerRef.current?.abort();
    };
  }, []);

  return (
    <div className='flex flex-col gap-8 pb-20'>
			<h2 className={styles.title}>{title}</h2>
			<div>
				<h2 className={styles.subTitle}>Aватар</h2>
				<PhotoContainer setImage={setUserImage} />
			</div>
			<div>
				{reqChangeNickname ?
        <>
						<Input
            data={{
              label: label,
              name: 'nickname',
              type: 'text',
              placeholder: label,
              value: profile.nickname,
              onChange: handleNicknameChange,
              labelSize: 'text-md'
            }} />
          
						{nicknameError &&
          <p className='text-red-500 text-sm mt-1'>{nicknameError}</p>
          }
						<div className='flex gap-2 mt-2'>
							<button
              onClick={handleSaveNickname}
              disabled={!validateNickname(profile.nickname).isValid}
              className='px-4 py-2 bg-[#6B5CD1] text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed'>
              
								{save}
							</button>
							{previousNickname.trim() &&
            <button
              onClick={() => {
                setProfileField('nickname', previousNickname);
                setReqChangeNickname(false);
                setNicknameError('');
              }}
              className='px-4 py-2 bg-gray-500 text-white rounded'>
              
									{cancel}
								</button>
            }
						</div>
						{!nicknameError &&
          <p className='font-normal text-sm text-[#828289] mt-2'>
								{validateNickname(profile.nickname).isValid ?
            `${complete}` :
            `От 4 до 32 символов. Разрешены буквы, цифры и _`}
							</p>
          }
					</> :

        <div
          className='text-lg font-semibold mb-4 cursor-pointer'
          onClick={() => {
            setPreviousNickname(profile.nickname);
            setReqChangeNickname(true);
            setNicknameError('');
          }}>
          
						{label}: {profile.nickname}
					</div>
        }
			</div>
			<div>
				<h2 className='text-lg font-semibold mb-4'>{yourAge}</h2>
				<div className='flex flex-row flex-wrap items-center gap-4'>
					{['14-17', '18-24', '25-30', '35+'].map((age) =>
          <label
            key={age}
            className='flex items-center space-x-3 cursor-pointer'>
            
							<input
              type='radio'
              name='age'
              onChange={() => setProfileField('age', age)}
              value={age}
              className='w-4 h-4 appearance-none border-1 border-[#525560] rounded-full checked:bg-[#6B5CD1] checked:border-[#6B5CD1] focus:outline-none focus:ring-[#6B5CD1]' />
            
							<span className='text-white font-semibold text-700'>
								{age}{' '}
								{age === '18-24' ? `${ageVariation2}` : `${ageVariation1}`}
							</span>
						</label>
          )}
				</div>
				<p className='font-normal text-sm text-[#828289] mt-2'>{minAge}</p>
			</div>
			<TextArea
        data={{
          label: selectedMatchType === 'realLife' ? labelRealLife : labelOnline,
          name: 'comment',
          placeholder: placeholder,
          value: profile.about,
          minLength: 30,
          maxLength: 400,
          notification: `${profile.about.length}/400 ${char}`,
          onChange: (value: string) => setProfileField('about', value)
        }} />
      

			<QualityDescriptionIndicator />
		</div>);

};

export default OnboardingAboutMe;