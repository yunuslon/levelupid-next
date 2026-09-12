import axios from 'axios'
import { getEnv } from './env'

const baseConfig = {
  baseURL: getEnv('ALPHA_API_URL'),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

export const alphaPublicApi = axios.create(baseConfig)

export const alphaCFApi = axios.create({
  ...baseConfig,
  headers: {
    ...baseConfig.headers,
    'CF-Access-Client-Id': getEnv('CF_ACCESS_CLIENT_ID'),
    'CF-Access-Client-Secret': getEnv('CF_ACCESS_CLIENT_SECRET'),
  },
})
