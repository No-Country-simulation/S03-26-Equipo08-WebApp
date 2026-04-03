import { getTestimonios } from "../../services/testimonios"

export function Embeds () {

    const testimonios = getTestimonios("Aprobado")

    return (
        <>
            <h2 style={{fontSize:'xx-large'}} className="text-2xl font-bold">Embeds y Código de Integración</h2>
            <p>Integra testimonios en tu sitio web</p>

            <pre className="bg-black text-green-400 p-4 rounded">
                GET /api/testimonios?status=Aprobado
            </pre>
            <pre className="bg-black text-green-400 p-4 rounded mt-2">
                {`fetch("/api/testimonios?status=Aprobado")
                .then(res => res.json())
                .then(data => console.log(data));`}
            </pre>
            <pre className="bg-black text-green-400 p-4 rounded mt-2">
                {`[
                    {
                        "firstName": "Juan",
                        "comentario": "Muy buen servicio",
                        "rating": 5
                        }
                    ]`}
            </pre>
            <h3 className="text-lg font-semibold mt-6">Vista real (API simulada)</h3>

            {testimonios.length === 0 ? (
            <p className="text-gray-500">No hay testimonios aprobados</p>
            ) : (
                testimonios.map(t => (
                    <div key={t.id} className="border p-3 mt-2 rounded">
                        <p><b>{t.firstName} {t.surname}</b></p>
                        <p>{t.comentario}</p>
                        <p>⭐ {t.rating}</p>
                    </div>
))
)}
        </>
    )
}

export default Embeds