import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface UbicacionProps {
  barberia: {
    nombre: string
    direccion: string | null
    telefono: string | null
    whatsapp: string | null
    google_maps_url: string | null
    horario: unknown
  }
}

export default function Ubicacion({ barberia }: UbicacionProps) {
  const horario = barberia.horario as Record<string, { apertura: string; cierre: string } | null>

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto" id="ubicacion">
      <h2 className="text-3xl font-black uppercase tracking-tight mb-10 text-center">
        Encuéntranos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {barberia.direccion && (
            <div className="flex items-start gap-3">
              <MapPin className="text-amber-500 mt-0.5 shrink-0" size={20} />
              <p className="text-gray-300">{barberia.direccion}</p>
            </div>
          )}
          {barberia.telefono && (
            <div className="flex items-center gap-3">
              <Phone className="text-amber-500 shrink-0" size={20} />
              <p className="text-gray-300">{barberia.telefono}</p>
            </div>
          )}
          {barberia.whatsapp && (
            <a
              href={`https://wa.me/${barberia.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="flex items-center gap-2">
                <MessageCircle size={16} /> Escríbenos por WhatsApp
              </Button>
            </a>
          )}
          <div className="mt-6">
            <h3 className="text-amber-500 font-bold mb-3 flex items-center gap-2">
              <Clock size={16} /> Horarios
            </h3>
            <div className="space-y-1 text-sm text-gray-400">
              {Object.entries(horario).map(([dia, h]) => (
                <div key={dia} className="flex justify-between">
                  <span className="capitalize">{dia}</span>
                  <span>{h ? `${h.apertura} - ${h.cierre}` : 'Cerrado'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {barberia.google_maps_url && (
          <div className="rounded-xl overflow-hidden h-64 md:h-auto">
            <iframe
              src={barberia.google_maps_url}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '250px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa ${barberia.nombre}`}
            />
          </div>
        )}
      </div>
    </section>
  )
}
