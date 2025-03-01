// import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link, useResolvedPath } from 'react-router-dom'
import ThemeSelector from './ThemeSelector'
import Developer from '../pages/Developer'

const NavBar = () => {
  const { pathname } = useResolvedPath()
  const isHomePage = pathname === '/'

  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-base-content/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] justify-between">
          {/* Logo */}
          <div className="flex-1 lg:flex-none">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2">
                {/* <ShoppingCartIcon className="size-9 text-primary" /> */}
                <span className="font-semibold font-mono tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  NerdX Solution
                </span>
              </div>
            </Link>
          </div>
          {/* Right section */}
          <div className="flex items-center gap-4">
            <div> {/* Changed <p> to <div> */}
  
              <ThemeSelector />
              {isHomePage && (
                <div className="indicator">
                  <div className=" transition-colors justify-center items-center flex">
                     {/* <ShoppingCartIcon className="size-5" /> */}
                    {/* <span className="badge badge-sm badge-primary indicator-item">
                      
                      </span>  */}
                   
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
