import { EnumRoutes } from './router.consts';
import { IRoute } from './router.types';
import AuthPage from '@/pages/auth/AuthPage';
import Friends from '@/pages/friends/ui/Friends';
import Home from '@/pages/home/ui/Home';
import { Notification } from '@/pages/notifications';
import { Onboarding } from '@/pages/onboarding';
import Profile from '@/pages/profile/ui/Profile';
import ProfileGames from '@/pages/profileGames/ui/ProfileGames';
import ProfileInfoOnline from '@/pages/profileInfoOnline/ProfileInfoOnline';
import ProfileInfoRealLife from '@/pages/profileInfoRealLife/profileInfoRealLife';
import ProfilePrivacy from '@/pages/profilePrivacy';
import ProfileSettings from '@/pages/profileSettings/ui/ProfileSettings';
import ProfileSupport from '@/pages/profileSupport/ui/ProfileSupport';
import { ProfileTickets } from '@/pages/proflleTickets/profileTickets';
import SearchPage from '@/pages/searchPage/ui/SearchPage';
import { TicketDetail } from '@/pages/ticketDetail/TicketDetail';

type BgRoutesType = {
	[key in EnumRoutes]?: string;
};
export const bgRoutes: BgRoutesType = {
	[EnumRoutes.HOME]: '#FFC96A',
	[EnumRoutes.ONBOARDING]: '#FFC96A'
};

export const routes: IRoute[] = [
	{
		path: '/auth',
		component: AuthPage
	},
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
		path: EnumRoutes.PROFILE_TICKETS,
		component: ProfileTickets
	},
	{
		path: EnumRoutes.PROFILE_TICKET_DETAIL,
		component: TicketDetail
	},
	{
		path: EnumRoutes.PROFILE_SUPPORT,
		component: ProfileSupport
	},
	{
		path: EnumRoutes.PROFILE_PRIVACY,
		component: ProfilePrivacy
	},
	{
		path: EnumRoutes.PROFILE_INFO_ONLINE,
		component: ProfileInfoOnline
	},
	{
		path: EnumRoutes.PROFILE_INFO_REALLIFE,
		component: ProfileInfoRealLife
	},
	{
		path: EnumRoutes.NOTIFICATIONS,
		component: Notification
	}
];
