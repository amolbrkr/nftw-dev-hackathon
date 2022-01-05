import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import Utils from '../../lib/util';
import styles from '../../styles/Home.module.scss'
import Head from 'next/head'

interface Props {
  assets: any
}

const Home: NextPage<Props> = (props) => {
  const [assets, setAssets] = useState(props.assets as any);
  const router = useRouter();

  const loadDetail = (addr: string, token: string) => {
    router.push(`/assets/${addr}__${token}`);
  }

  const loadAssets = async () => {
    const page = (assets.length / 10) + 1; // Number of pages / page size + 1
    fetch(`${Utils.baseUrl}/api/assets?page=${page}`)
      .then(res => res.json())
      .then(newAssets => setAssets((assets: any) => [...assets, ...newAssets]));
  }

  return (
    <>
      <Head>
        <title>NFTW - The NFT Marketplace</title>
      </Head>
      <div className='container'>
        <div>
          <h1 className='title is-3'>Best Selling NFTs</h1>
        </div>
        <InfiniteScroll
          className={styles.assetList}
          dataLength={assets.length}
          next={loadAssets}
          hasMore={true}
          loader={<div className='m-4 center-mixin'><Loader type="Grid" color="#111" height={40} width={40} /></div>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          {assets.map((asset: any) =>
            <div onClick={() => loadDetail(asset.asset_contract.address, asset.token_id)} key={asset.id} className='card asset-preview'>
              <div className='card-image'>
                <Image src={asset.image_url} layout='fill' objectFit='cover' alt='Placeholder image' />
              </div>
              <div className="ext-link">
                <a href={asset.permalink} target='_blank' rel='noopener noreferrer'>
                  <Image src="/external.png" height={30} width={30} alt='Show in OpenSea' />
                </a>
              </div>
              <div className='card-content'>
                <p className="subtitle is-5">${asset.last_sale.payment_token.usd_price.substring(0, 6)}</p>
                <h2 className='title is-4'>{asset.name}</h2>
                <p className='subtitle is-6'>By <strong>{asset.creator ? asset.creator.user?.username : 'Unknown'}</strong>, {asset.num_sales} units sold.</p>
              </div>
            </div>)}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default Home

export async function getServerSideProps(context: any) {
  const res = await fetch(`${Utils.baseUrl}/api/assets?page=1`);

  if (!res.ok) console.log('Request failed', res.status);
  return { props: { assets: await res.json() } };
}