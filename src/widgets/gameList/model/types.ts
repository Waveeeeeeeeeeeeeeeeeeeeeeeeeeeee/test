import { Game } from '@/entities/game/model/types';

export type GameListProps = {
  games: Game[];
  allGameTitles: string[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedGameIds: string[];
  onChangeSelectedGameIds: (ids: string[]) => void;
  searchPlaceholder?: string;
  withTargetSelector?: boolean;
  onToggle?: (game: Game) => void;
  onTogglePurpose?: () => void;
};