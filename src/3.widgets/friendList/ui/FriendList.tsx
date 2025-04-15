import { friendList } from '@/5.entities/friends/config/friendList'
import FriendCard from '@/5.entities/friends/ui/FriendCard'

const FriendList = () => {
	return (
		<div className='flex flex-col gap-5'>
			{friendList.map(friend => (
				<FriendCard person={friend} />
			))}
		</div>
	)
}

export default FriendList
