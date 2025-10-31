import { useAvatar } from '@/entities/user/model/selectors';

export const UserAvatar = () => {
  const avatar = useAvatar();
  return (
    <div className='w-10 h-10 rounded-xl cursor-pointer'>
			<img className='rounded-xl' src={avatar} alt='avatar' />
		</div>);

};