import SharIco from './assets/sharLogo.svg?react';
import TextIco from './assets/textLogo.svg?react';

export const Logo = () => {
  return (
    <div className='flex items-center cursor-pointer'>
			<SharIco />
			<TextIco />
		</div>);

};