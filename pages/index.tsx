import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = (props) => {
  const assetCards = props.assets.map(asset =>
    <div key={asset.id} className='card'>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <Image src={asset.image_preview_url} layout='fill' alt='Placeholder image' />
        </figure>
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
            <p className='subtitle is-6'>Sales: {asset.num_sales}</p>
          </div>
        </div>

        <div className='content'>
          {asset.description?.length > 200 ? `${asset.description.substring(0, 200)}...` : asset.description}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div>
        <h1 className="title is-3">Best Selling NFTs</h1>
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