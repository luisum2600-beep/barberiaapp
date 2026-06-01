import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      barberia_id: string
      rol: string
    } & DefaultSession['user']
  }

  interface JWT {
    barberia_id?: string
    rol?: string
  }
}
