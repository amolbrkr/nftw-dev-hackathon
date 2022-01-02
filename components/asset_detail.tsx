import type { NextPage } from 'next'
import Image from 'next/image'

const AssetDetail: NextPage<any> = ({ asset }) => {
  console.log(asset);
  const recentOrders = asset.orders.map(order => (
    <div key={order.order_hash}>
      <div className='is-flex is-align-items-center mb-2'>
        <figure className='image is-48x48 is-rounded'>
          <Image src={order.maker.profile_img_url} className='is-rounded' layout='fill' alt='Placeholder image' />
        </figure>
        <div className='is-flex is-justify-content-space-between ml-2' style={{ width: '100%' }}>
          <div>
            <h4 className="subtitle is-5 mb-0">{order.maker.user?.username}</h4>
            <span><strong>{order.payment_token_contract.eth_price.substring(0, 4)} ETH</strong> (${order.payment_token_contract.usd_price.substring(0, 6)})</span>
          </div>
          <div>Expires On {new Date(order.closing_date).toLocaleDateString('en-US')}</div>
        </div>
      </div>
    </div>
  ))

  return (
    <div className="container asset-detail">
      <div className="preview">
        {asset.animation_url ? <video autoPlay muted loop src={asset.animation_url}></video> :
          <Image src={asset.image_url} layout='fill' objectFit='contain' alt='Asset Preview' />}
      </div>
      <div className="asset-info">
        <h1 className="title is-3 has-text-weight-bold">{asset.name}</h1>
        <h3 className="subtitle is-6">Created by {asset.creator.user?.username} on {new Date(asset.asset_contract.created_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
        <p>
          {asset.description}
        </p>
        <div className="partition">
          <h3 className="title is-5">Price & Stats</h3>
          <div className="stats level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Avg. Price</p>
                <p className="title is-5">{Math.round(asset.collection.stats.average_price * 100) / 100} ETH</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">1 Day Sales</p>
                <p className="title is-5">{asset.collection.stats.one_day_sales}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">7 Day Sales</p>
                <p className="title is-5">{asset.collection.stats.seven_day_sales}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">30 Day Sales</p>
                <p className="title is-5">{asset.collection.stats.thirty_day_sales}</p>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Total Sales</p>
                <p className="title is-5">{asset.collection.stats.total_sales}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="partition">
          <h3 className="title is-5">Recent Orders</h3>
          <div className="stats orders">
            {recentOrders}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetDetail