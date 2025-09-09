import { Logo } from '@/shared/ui/icons/Logo/Logo';
import { UserAvatar } from '@/shared/ui/icons/UserAvatar/UserAvatar';

const Header = () => {
	return (
		<div className='flex justify-between items-center h-20'>
			<Logo />
			<UserAvatar />
		</div>
	);
};

export default Header;
