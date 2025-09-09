import { Game } from "@/5.entities/game/model/types"
import { Purpose } from "@/5.entities/user/model/types"

export type GameListProps = {
	games: Game[]
	searchValue: string
	onSearchChange: (value: string) => void
	onToggle: (game: Game) => void
	selectedGameIds: string[]
	allGameTitles: string[]
	searchPlaceholder?: string
	withTargetSelector?: boolean
	getPurpose?: (id: string) => Purpose[] | undefined
	isTargetSelectorOpen?: (id: string) => boolean
	onTogglePurpose?: (id: string) => void
}