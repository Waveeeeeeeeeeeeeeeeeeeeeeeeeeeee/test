import { useParams } from 'react-router'

import { searchList } from '@/5.entities/search/config/searchList'
import { AnimatedPage } from '@/6.shared/hoc/AnimatedPage'
import FilterICon from '@/6.shared/ui/Filter/Filter'
import { NotificationHeader } from '@/6.shared/ui/NotificationHeader'

const SearchPage = () => {
	const { searchType } = useParams<{ searchType: string }>()
	const card = searchList.find(item => item.href.endsWith(searchType || ''))

	if (!card) return <div>Ничего не найдено 😢</div>

	return (
		<div className='pt-4 pb-24 px-1.5 h-full'>
			<NotificationHeader title={card.title} back={true} />
			<div>
				<FilterICon />
			</div>
		</div>
	)
}

export default AnimatedPage(SearchPage)
