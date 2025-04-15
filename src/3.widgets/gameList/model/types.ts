import { Game } from "@/5.entities/game/model/types"

export type GameListProps = {
	games: Game[]
	searchValue: string
	onSearchChange: (value: string) => void
	onToggle: (game: Game) => void
	selectedGameIds: string[]
	allGameTitles: string[]
	searchPlaceholder?: string
}