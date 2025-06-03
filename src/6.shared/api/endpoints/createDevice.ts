import { axiosInstance } from '../axiosInstance'

type CreateDeviceParams = {
  user_id: number
  service_id: number
  platform: 'Web_App'
  push_service_token: null
}

export const createDevice = (data: CreateDeviceParams) => {
  return axiosInstance.post('/devices/create_device', data)
}