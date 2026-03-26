export function Footer() {
  return (
    <>
        <footer className="bg-gray-100 mt-20">
  <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

    <div>
      <h3 className="text-xl font-bold">TestimonialHub</h3>
      <p className="mt-2 text-gray-600">
        Plataforma para compartir experiencias reales y ayudar a otros usuarios.
      </p>
    </div>

    <div>
      <h4 className="font-semibold">Links</h4>
      <ul className="mt-2 space-y-2 text-gray-600">
        <li>Inicio</li>
        <li>Testimonios</li>
        <li>About Us</li>
      </ul>
    </div>

    <div>
      <h4 className="font-semibold">Contacto</h4>
      <p className="mt-2 text-gray-600">
        contacto@testimonialhub.com
      </p>
    </div>

  </div>

  <div className="text-center py-4 text-gray-500 border-t">
    © 2026 TestimonialHub. Todos los derechos reservados.
  </div>
</footer>
    </>
  );
}

export default Footer