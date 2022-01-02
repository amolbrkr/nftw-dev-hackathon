import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AssetDetail from '../../components/asset_detail'
import Utils from '../../lib/util'

const Asset = () => {
  const router = useRouter()
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { id } = router.query
      fetch(`${Utils.baseUrl}/api/assets/${id}`).then(res => res.json()).then(data => setAsset(data));
    }
  }, [router]);

  return asset ? <AssetDetail asset={asset} /> : (
    <div className='is-flex is-justify-content-center is-align-items-center'>
      <h3 className='title is-5'>Loading </h3><br /><span className="loader-mixin"></span>
    </div>);
}

export default Asset;

