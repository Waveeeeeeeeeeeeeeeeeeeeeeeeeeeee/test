import { EnumRoutes } from './router.consts';
import { IRoute } from './router.types';
import Friends from '@/pages/friends/ui/Friends';
import Home from '@/pages/home/ui/Home';
import { Onboarding } from '@/pages/onboarding';
import Profile from '@/pages/profile/ui/Profile';
import ProfileGames from '@/pages/profileGames/ui/ProfileGames';
import ProfileSettings from '@/pages/profileSettings/ui/ProfileSettings';
import ProfileSupport from '@/pages/profileSupport/ui/ProfileSupport';
import SearchPage from '@/pages/searchPage/ui/SearchPage';

type BgRoutesType = {
	[key in EnumRoutes]?: string;
};
export const bgRoutes: BgRoutesType = {
	[EnumRoutes.HOME]: '#FFC96A',
	[EnumRoutes.ONBOARDING]: '#FFC96A'
};

export const routes: IRoute[] = [
	{
		path: EnumRoutes.HOME,
		component: Home
	},
	{
		path: EnumRoutes.ONBOARDING,
		component: Onboarding
	},
	{
		path: EnumRoutes.SEARCH,
		component: SearchPage
	},

	{
		path: EnumRoutes.SEARCH_DETAIL,
		component: SearchPage
	},
	{
		path: EnumRoutes.FRIENDS,
		component: Friends
	},
	{
		path: EnumRoutes.PROFILE,
		component: Profile
	},
	{
		path: EnumRoutes.PROFILE_SETTINGS,
		component: ProfileSettings
	},
	{
		path: EnumRoutes.PROFILE_GAMES,
		component: ProfileGames
	},
	{
		path: EnumRoutes.PROFILE_SUPPORT,
		component: ProfileSupport
	}
];
