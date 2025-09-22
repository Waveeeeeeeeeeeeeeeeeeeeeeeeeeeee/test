import { axiosInstance } from '../axiosInstance';

type CreateUserParams = {
	nickname: string;
	lang: string;
	city: string;
	country: string;
	country_code: string;
	countries: string;
	email: string | null;
	password_hash: null;
	telegram_id: number;
};

export type CreateUserResponse = {
	id: number;
	nickname: string;
	lang: string;
	city: string;
	country: string;
	country_code: string;
	countries: string;
	email: string | null;
	password_hash: string | null;
	telegram_id: number;
	is_blocked: boolean;
	blocked_to: string | null;
	created_at: string;
};
export const createUser = async (
	data: CreateUserParams
): Promise<CreateUserResponse> => {
	const res = await axiosInstance.post(
		'/database/v1/common/users/create_user',
		data
	);
	return res.data;
};
