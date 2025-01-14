import type { CookieRef } from '#app'

interface State {
  account: CookieRef<string | null | undefined>
}

export const useAccountStore = defineStore('account', {
  state: (): State => ({
    account: useCookie('wallet.account')
  }),
  getters: {
    getAccount: (state) => state.account
  },
  actions: {
    setAccount (address: string) {
      const cookieAccount = useCookie('wallet.account', {
        secure: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365
      })
      this.account = address
      cookieAccount.value = address
    },
    resetAccount () {
      console.log('init logout...')
      const cookieAccount = useCookie('wallet.account', {
        secure: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365
      })
      this.account = ''
      cookieAccount.value = ''
    }
  }
})
