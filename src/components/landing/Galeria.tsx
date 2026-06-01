import Image from 'next/image'

interface GaleriaProps {
  fotos: string[]
}

export default function Galeria({ fotos }: GaleriaProps) {
  const fotosGaleria = fotos.slice(1) // skip hero photo
  if (fotosGaleria.length === 0) return null

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="galeria">
      <h2 className="text-3xl font-black uppercase tracking-tight mb-10 text-center">
        Galería
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {fotosGaleria.map((foto, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
            <Image
              src={foto}
              alt={`Foto ${i + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
