/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Offers() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Nuestra seleccion de recomendados
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Visita la lista de los mejores vinos, elegidos por nuestros
              expertos
            </p>
          </div>
          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/03/15/16473549480220.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://cdn.shopify.com/s/files/1/0005/4634/0925/articles/14122017-3S1A4322_1024x1024.png?v=1579271827"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.cocinayvino.com/wp-content/uploads/2017/03/Catar-un-vino-1024x683.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.cronista.com/files/image/448/448993/621529a9b0eb8.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.vinetur.com/imagenes/2016/septiembre/14/botellas_vino_colores.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.bodegasmurilloviteri.com/wp-content/uploads/2020/01/caracteristicas_de_un_buen_vino_tinto.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.excelenciasgourmet.com/sites/default/files/styles/slideshow_large/public/2019-01/vi%C3%B1edo-vides.jpg?itok=lierrOZ9"
                          alt=""
                          className="w-100 h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="inline-block text-center bg-yellow-500 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-yellow-700"
              >
                Ver Listado
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offers;
