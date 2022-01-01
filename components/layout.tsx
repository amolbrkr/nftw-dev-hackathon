import type { NextPage } from 'next'
import Header from './header'

const Layout: NextPage<any> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <footer className='has-background-black'>
        <p>Built with love for MongoDB Atlas Hackathon on <a href="https://dev.to">DEV</a> by <strong className='has-text-white'>Amol Borkar</strong> (View full code here).</p>
        <p>Powered by superb <a href="https://mongodb.com">MongoDB</a> products like <a href="https://www.mongodb.com/atlas/search">Atlas Search</a>, <a href="https://www.mongodb.com/realm/appdev">Realm Functions</a> and <a href="https://www.mongodb.com/atlas/database">Database.</a></p>
      </footer>
    </>
  )
}

export default Layout