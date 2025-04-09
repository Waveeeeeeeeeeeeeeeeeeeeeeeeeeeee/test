import { searchList } from '@/5.entities/search/config/searchList'
import { SearchCard } from '@/5.entities/search/ui/SearchCard'

const TargetSearchList = () => {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2'>
			{searchList.map(card => (
				<SearchCard key={card.id} data={card} />
			))}
		</div>
	)
}

export default TargetSearchList
