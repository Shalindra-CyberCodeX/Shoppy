import { notFound } from "next/navigation"
import { ShopView } from "@/components/shoppy/shop-view"
import { getShopById, getProductsByShop } from "@/lib/mock-data"

export default async function ShopPage({ params }: { params: Promise<{ shopId: string }> }) {
  const { shopId } = await params
  const shop = getShopById(shopId)

  if (!shop) {
    notFound()
  }

  const products = getProductsByShop(shop.id)

  return <ShopView shop={shop} products={products} />
}
