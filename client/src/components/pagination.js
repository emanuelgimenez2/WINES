import React from 'react'
import { Link } from 'react-scroll'

function Pagination({products, productPerPage, paginado, prev} ) {
    const pageNumbers = []
    
    for (let i = 1; i <= Math.ceil(products / productPerPage); i++) {
        pageNumbers.push(i)
    }
    
    
    return (
        <nav className='grid justify-items-center bg-gray-100'>
            <ul className='inline-flex -space-x-md m-3'>                
                {pageNumbers && pageNumbers.map(number => { 
                    return <li key={number} className='py-2 px-3 m-3 leading-tight text-gray-500 bg-white border border-violet-700 rounded-full hover:bg-violet-700 hover:text-white cursor-pointer'>
                                 <Link to='listado' spy={true} smooth={true} offset={0} duration={2000} onClick={() => paginado(number)} className='p-2'>{number}</Link>
                            </li>
                })}
            </ul>
        </nav>
    )
}

export default Pagination