import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AssetDetail from '../../components/asset_detail'
import Loader from 'react-loader-spinner'
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

  return asset ? <AssetDetail asset={asset} /> : <div className='m-4 center-mixin'><Loader type="Grid" color="#111" height={40} width={40} /></div>;
}

export default Asset;

