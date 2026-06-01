import { Star } from 'lucide-react'

interface Resena {
  id: string
  autor: string
  texto: string
  rating: number
}

interface ResenasProps {
  resenas: Resena[]
}

export default function Resenas({ resenas }: ResenasProps) {
  if (resenas.length === 0) return null

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto bg-neutral-900/50" id="resenas">
      <h2 className="text-3xl font-black uppercase tracking-tight mb-10 text-center">
        Opiniones
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resenas.map((r) => (
          <div key={r.id} className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < r.rating ? 'text-amber-500 fill-amber-500' : 'text-neutral-700'}
                />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">&quot;{r.texto}&quot;</p>
            <p className="text-gray-500 text-xs mt-3 font-semibold">— {r.autor}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
