import { FC, SVGProps } from 'react';

export type SearchCardTypes = {
  id: string;
  title: string;
  href: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  players: number;
};