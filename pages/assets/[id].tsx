import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AssetDetail from '../../components/asset_detail'

const Asset = () => {
  const router = useRouter()
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { id } = router.query
      const [contractAddr, tokenId] = id.split('__')
      fetch(`https://api.opensea.io/api/v1/asset/${contractAddr}/${tokenId}/`).then(res => {
        res.json().then(data => { setAsset(data); console.log(data); });
      })
    }
  }, [router]);

  return asset ? <AssetDetail asset={asset} /> : <div className='is-flex is-justify-content-center is-align-items-center'><h3 className='title is-5'>Loading </h3><span className="loader-mixin"></span></div>;
}

export default Asset;

