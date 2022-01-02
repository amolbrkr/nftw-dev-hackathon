import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'

const Home: NextPage = (props) => {
  const assetCards = props.assets.map(asset =>
    <a href={`/assets/${asset.asset_contract.address}__${asset.token_id}`} key={asset.id} className='card asset-preview'>
      <div className='card-image'>
        <Image src={asset.image_url} layout='fill' objectFit='cover' alt='Placeholder image' />
      </div>
      <div className="ext-link">
        <a href={asset.permalink} target='_blank' rel='noopener noreferrer'>
          <Image src="/external.png" height={30} width={30} alt='Show in OpenSea' />
        </a>
      </div>
      <div className='card-content'>
        <h2 className='title is-4'>{asset.name}</h2>
        <p className='subtitle is-6'>By <strong>{asset.creator ? asset.creator.user?.username : 'Unknown'}</strong>, {asset.num_sales} units sold.</p>
      </div>
    </a>
  );

  return (
    <div className='container'>
      <div>
        <h1 className='title is-3'>Best Selling NFTs</h1>
      </div>
      <div className={styles.assetList}>
        {assetCards}
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  let inDev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  const res = await fetch(`${inDev ? DEV_URL : PROD_URL}/api/assets`);

  if (!res.ok) console.log('Request failed', res.status);
  return { props: { assets: await res.json() } };
}