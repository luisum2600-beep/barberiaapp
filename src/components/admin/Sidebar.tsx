'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  Scissors,
  Calendar,
  Settings,
  CreditCard,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/barberos', label: 'Barberos', icon: Users },
  { href: '/admin/servicios', label: 'Servicios', icon: Scissors },
  { href: '/admin/reservas', label: 'Reservas', icon: Calendar },
  { href: '/admin/personalizar', label: 'Personalizar', icon: Settings },
  { href: '/admin/pagos', label: 'Pagos', icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 bg-neutral-900 border-r border-neutral-800 flex flex-col">
      <div className="px-6 py-5 border-b border-neutral-800">
        <h1 className="text-amber-500 font-black text-lg uppercase tracking-wider">
          Admin Panel
        </h1>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-amber-500/10 text-amber-500'
                : 'text-gray-400 hover:text-white hover:bg-neutral-800'
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
