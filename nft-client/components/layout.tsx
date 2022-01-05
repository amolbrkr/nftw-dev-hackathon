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
        <p>Built with love for MongoDB Atlas Hackathon on <a href="https://dev.to">DEV</a> by <strong className='has-text-white'>Amol Borkar</strong>.</p>
        <p className='p1'>Powered by superb <a href="https://mongodb.com">MongoDB</a> products like <a href="https://www.mongodb.com/atlas/search">Atlas Search</a>, <a href="https://www.mongodb.com/realm/appdev">Realm Functions</a> and <a href="https://www.mongodb.com/atlas/database">Database.</a> All the assets listed on this website are fetched from the <a href="https://docs.opensea.io/reference/api-overview">OpenSea NFT API.</a> All rights go to their respective owners.</p>
      </footer>
    </>
  )
}

export default Layout