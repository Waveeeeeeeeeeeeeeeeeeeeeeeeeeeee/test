import { useUserStore } from "./store";

export const useUser = () => useUserStore((state) => state.user);
export const useAvatar = () => useUserStore((state) => state.user?.photo_url);
export const useUserName = () => useUserStore((state) => state.user?.username);
export const useUserHash = () => useUserStore((state) => state.userHash);