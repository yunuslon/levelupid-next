import packageJson from '../../package.json'

const currentYear = new Date().getFullYear()

export const APP_CONFIG = {
  name: 'Echo Admin',
  version: packageJson.version,
  copyright: `© ${currentYear}, Studio Admin.`,
  meta: {
    title: 'Echo Admin',
    description: 'Kelola toko online Anda melalui Echo Admin.',
  },
}
