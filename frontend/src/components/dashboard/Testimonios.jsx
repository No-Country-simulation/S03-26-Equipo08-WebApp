export function Testimonios () {
    return(
        <>
        <div style={{display:'flex' , justifyContent:'space-between'}}>
            <div>
                <h2 style={{fontSize:'xx-large'}} className="text-2xl font-bold">Testimonios</h2>
                <p>Gestiona todos los testimonios del sistema</p>
            </div>
            <div>
                <a href="#" style={{background:'#8A5DE8'}} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+ Nuevo Testimonio</a>
            </div>
        </div>
    
    <div>
        <div className="relative w-full max-w-sm">
            {/* Icono */}
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
    🔍
                </span>

        {/* Input */}
            <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>

        <div class="sm:col-span-3">
          <div class="mt-2 grid grid-cols-1">
            <select id="country" name="country" autocomplete="country-name" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
            <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4">
              <path d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
          </div>
        </div>
    </div>
        </>
    )
}

export default Testimonios