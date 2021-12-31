import type { NextPage } from 'next'

const Layout: NextPage<any> = ({ children }) => {
  return (
    <>
      <header>
        <nav className="navbar is-black is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <h1>NFTrove</h1>
            </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item">
                Home
              </a>

              <a className="navbar-item">
                Code
              </a>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field">
                  <p className="control is-small has-icons-right">
                    <input className="input is-rounded" type="search" placeholder="Search for NFTs" style={{ minWidth: '30vw', height: '32px' }} />
                    <span className="icon is-small is-right">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
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