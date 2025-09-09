import { axiosInstance } from '../axiosInstance'

type CreateDeviceParams = {
  user_id: number
  service_id: number
  platform: 'WEB_APP'
  push_service_token: null
}

export const createDevice = (data: CreateDeviceParams) => {
  return axiosInstance.post('/database/devices/create_device', data)
}