import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'

const Home: NextPage = (props) => {
  const assetCards = props.assets.map(asset =>
    <div key={asset.id} className='card asset-preview'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <Image src={asset.image_preview_url} layout='fill' alt='Placeholder image' />
        </figure>
        <a href='http://test.com'></a>
      </div>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image is-48x48 is-rounded'>
              <Image src={asset.owner.profile_img_url} className='is-rounded' layout='fill' alt='Placeholder image' />
            </figure>
          </div>
          <div className='media-content'>
            <p className='title is-4'>{asset.name}</p>
            <p className='subtitle is-6'>By <strong>{asset.creator ? asset.creator.user?.username : 'Unknown'}</strong>, {asset.num_sales} units sold.</p>
          </div>
        </div>

        <div className='content'>
          {asset.description?.length > 100 ? `${asset.description.substring(0, 99)}...` : asset.description}
        </div>
      </div>
      <div className='card-footer asset-footer'>
        <a href={`/assets/${asset.asset_contract.address}__${asset.token_id}`} className='card-footer-item'>View</a>
        <a href={asset.permalink} className='card-footer-item' target='_blank' rel='noreferrer'>Show on Opensea</a>
      </div>
    </div>
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