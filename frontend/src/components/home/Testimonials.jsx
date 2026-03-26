import Quantity from "./Quantity"

export function Testimonials () {
    return (
        <>
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div style={{textAlign:'center'}}>
                <h2 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Lo que dicen nuestros usuarios</h2>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Descubrí opiniones reales de personas que ya utilizaron distintos productos y servicios. Sus experiencias pueden ayudarte a tomar mejores decisiones.</p>
            </div>
      <div style={{marginTop:'6%'}} className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
        <div style={{background:'#70D5FA' , color:'white'}} className="flex flex-col items-start rounded-lg bg-white p-6 shadow-sm transition-all hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900">
          <div style={{textAlign:'center'}} className="mb-4 flex items-center space-x-4">
            <div>
              <h4 style={{color:'black'}} className="text-lg font-semibold">Olivia Davis</h4>
              <p style={{color:'black'}} className="text-sm text-gray-500 dark:text-gray-400">CEO, Acme Inc</p>
            </div>
          </div>
          <p style={{color:'black'}} className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            "The customer service I received was exceptional. The support team\n went above and beyond to address my
            concerns."
          </p>
        </div>
        <div style={{background:'#70D5FA'}} className="flex flex-col items-start rounded-lg bg-white p-6 shadow-sm transition-all hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center space-x-4">
            <div>
              <h4 style={{color:'black'}} className="text-lg font-semibold">Jared Palmer</h4>
              <p style={{color:'black'}} className="text-sm text-gray-500 dark:text-gray-400">CTO, Vercel</p>
            </div>
          </div>
          <p style={{color:'black'}} className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            "The platform has been a game-changer for our team. The seamless\n deployment and scalability have allowed
            us to focus on building\n great products."
          </p>
        </div>
        <div style={{background:'#70D5FA' , color:'white'}} className="flex flex-col items-start rounded-lg bg-white p-6 shadow-sm transition-all hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900">
          <div className="mb-4 flex items-center space-x-4">
            <div>
              <h4 style={{color:'black'}} className="text-lg font-semibold">Max Leiter</h4>
              <p style={{color:'black'}} className="text-sm text-gray-500 dark:text-gray-400">Developer, Acme Inc</p>
            </div>
          </div>
          <p style={{color:'black'}} className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            "The developer tools and documentation have been invaluable. I was\n able to get up and running in no time
            and build complex\n applications with ease."
          </p>
        </div>
      </div>
    </section>
    <Quantity/>
        </>
    )
}

export default Testimonials