import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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

  return (
    <h1>Asset detail will go here</h1>
  )

}

export default Asset;

