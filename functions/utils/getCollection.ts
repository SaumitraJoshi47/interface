import { CollectionDocument } from '../../src/graphql/data/__generated__/types-and-hooks'
import client from '../client'

export default async function getCollection(collectionAddress: string, url: string) {
  const origin = new URL(url).origin
  const image = origin + '/api/image/nfts/collection/' + collectionAddress
  const { data } = await client.query({
    query: CollectionDocument,
    variables: {
      addresses: collectionAddress,
    },
  })
  const collection = data?.nftCollections?.edges[0]?.node
  if (!collection || !collection.name) {
    return undefined
  }
  const formattedAsset = {
    title: collection.name + ' on Uniswap',
    image,
    url,
    name: collection.name,
    ogImage: collection.image?.url,
    isVerified: collection.isVerified,
  }
  return formattedAsset
}
