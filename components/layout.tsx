import type { NextPage } from 'next'
import Header from './header'

const Layout: NextPage<any> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <footer>
        <p>A footer goes here.</p>
      </footer>
    </>
  )
}

export default Layout