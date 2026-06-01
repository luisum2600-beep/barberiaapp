import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const usuario = await prisma.usuario.findUnique({
          where: { email: parsed.data.email },
          include: { barberia: true },
        })
        if (!usuario) return null

        const valid = await bcrypt.compare(parsed.data.password, usuario.password)
        if (!valid) return null

        return {
          id: usuario.id,
          email: usuario.email,
          barberia_id: usuario.barberia_id,
          rol: usuario.rol,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.barberia_id = (user as any).barberia_id
        token.rol = (user as any).rol
      }
      return token
    },
    session({ session, token }) {
      session.user.barberia_id = token.barberia_id as string
      session.user.rol = token.rol as string
      return session
    },
  },
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
})
