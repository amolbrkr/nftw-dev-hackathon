import type { NextPage } from 'next'
import React, { FormEvent, FormEventHandler, useState } from 'react';
import Utils from '../lib/util';

const Header: NextPage = () => {
  const [suggestions, setSuggestions] = useState([]);

  const queryChanged = (e: FormEvent<HTMLInputElement>) => {
    let query = (e.target as HTMLInputElement).value;
    if (query.length >= 3) {
      fetch(`${Utils.baseUrl}/api/assets/search/${query}`).then(res => {
        res.json().then(data => setSuggestions(data));
      })
    } else setSuggestions([]);
  }

  return (<header>
    <nav className="navbar is-black is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className='title is-3 has-text-danger'>NFTW</h1>
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
            View on Github
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item search">
            <div className="control is-small has-icons-right">
              <input onInput={e => queryChanged(e)} className="input is-rounded" type="search" placeholder="Search for NFTs" style={{ minWidth: '30vw', height: '32px' }} />
              <span className="icon is-small is-right">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <div className='suggestion-wrapper'>
              {suggestions ? suggestions.map((item: any)=> (
                <div key={item.id}>
                  <a href={`/assets/${item.asset_contract.address}__${item.token_id}`} >
                    <h5 className='title is-5'>{item.name}</h5>
                    <span className='subtitle is-6'>By {item.creator ? item.creator.user?.username : 'Unknown'}, {item.num_sales} units sold.</span>
                  </a>
                </div>
              )) : ""}
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  )
}

export default Header;