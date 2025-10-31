import React, { useRef, useState } from 'react';

import CameraIco from '@/shared/assets/images/camera.svg?react';
import { useCustomTranslation } from '@/shared/lib';

export type PhotoContainerProps = {
  setImage: (image: File) => void;
};

const PhotoContainer = ({ setImage }: PhotoContainerProps) => {
  const { title, subtitle } = useCustomTranslation('photoContainer');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<File | null>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotos(file);
      setImage(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className='w-full cursor-pointer rounded-2xl border-2 border-dashed border-gray-500 bg-[var(--second-bg)] p-1 text-center text-white hover:bg-[#2A2A2A] transition'>
      
			<div className='flex items-center gap-3'>
				{!photos ?
        <div className='rounded-xl bg-[#2D2D2D] py-6 px-4 h-full'>
						<CameraIco />
					</div> :

        <div className='w-16 h-20 flex justify-center items-center overflow-hidden rounded-2xl'>
						<img src={URL.createObjectURL(photos)} />
					</div>
        }
				<div className='flex flex-col justify-center items-center ga'>
					<p className='text-lg font-semibold mr-auto'>{title}</p>
					<p className='text-sm text-gray-400'>{subtitle}</p>
				</div>
			</div>
			<input
        type='file'
        accept='image/*'
        className='hidden'
        ref={fileInputRef}
        onChange={handleFileChange} />
      
		</div>);

};

export default PhotoContainer;