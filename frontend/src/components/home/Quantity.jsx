import OneTestimonial from "./OneTestimonial"

export function Quantity () {
    return(
        <>
<div className="bg-white py-24 sm:py-32">
  <div style={{background:'#8A5DE8'}} className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-start rounded-lg bg-white p-6 shadow-sm transition-all hover:bg-gray-50 dark:bg-gray-950 dark:hover:bg-gray-900 ">
    <dl style={{marginLeft:'25%'}} className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 ">
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt style={{color:'white'}} className="text-base/7 text-gray-600">Testimonios publicados</dt>
        <dd style={{color:'white'}} className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">+1,200</dd>
      </div>
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt style={{color:'white'}} className="text-base/7 text-gray-600">Usuarios registrados</dt>
        <dd style={{color:'white'}} className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">+850</dd>
      </div>
      <div className="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt style={{color:'white'}} className="text-base/7 text-gray-600">Opiniones compartidas</dt>
        <dd style={{color:'white'}} className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">+3,500</dd>
      </div>
    </dl>
  </div>
</div>
<OneTestimonial/>
        </>
    )
}

export default Quantity