import aboutUs from "../../assets/aboutUs.png"
import Testimonials from "./Testimonials"

export function AboutUs () {
    return(
        <>
            <div className="bg-white">
  <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
      <svg viewBox="0 0 1024 1024" aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0">
        <circle r="512" cx="512" cy="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
            <stop stop-color="#4A90E2" />
            <stop offset="1" stop-color="#70D5FA" />
          </radialGradient>
        </defs>
      </svg>
      <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
        <p className="mt-6 text-lg/8 text-pretty text-gray-300">Somos una plataforma dedicada a recopilar y compartir testimonios reales de usuarios. Nuestro objetivo es brindar un espacio confiable donde las personas puedan conocer experiencias auténticas antes de tomar decisiones sobre productos o servicios.</p>
        <p className="mt-6 text-lg/8 text-pretty text-gray-300">Creemos en la transparencia y en el poder de la opinión de los usuarios. Por eso, facilitamos la creación y visualización de reseñas, ayudando a construir una comunidad basada en la confianza y la información real</p>
        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <a href="#" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"> Get started </a>
          <a href="#" className="text-sm/6 font-semibold text-white hover:text-gray-100">
            Learn more
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="relative mt-16 h-80 lg:mt-8">
        <img width="1824" height="1080" src={aboutUs} alt="App screenshot" className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10" />
      </div>
    </div>
  </div>
</div>
        <Testimonials/>
        </>
    )
}

export default AboutUs