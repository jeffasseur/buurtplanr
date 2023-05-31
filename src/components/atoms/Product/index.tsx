import { useDroppedModel } from '@/components/zustand/buurtplanrContext'
import productList from '@/helpers/ProductList.json'

import WebpIcon from '../webpIcons'

import styles from './styles.module.css'

interface ProductProps {
  productType: string | null
}

export const Product = ({ productType }: ProductProps) => {
  const updateModel = useDroppedModel(state => state.updateModel)
  const handleDrag = (e) => {
    updateModel(e.target.dataset.modelname)
  }

  return (
    <div className={styles.productList}>
      {productList.list.map((product, index) => {
        if (productType == null) {
          return (
            <div key={index} className={styles.productListing} draggable='true' onDragStart={handleDrag} data-modelname={product.name}>
              <WebpIcon productType={null} onDragStart={handleDrag} name={product.name} data-modelname={product.name} />
            </div>
          )
        }
        if (productType === product.productType) {
          if (product.name) {
            return (
              <div key={index} className={styles.productListing} draggable='true' onDragStart={handleDrag} data-modelname={product.name}>
                <WebpIcon productType={productType} onDragStart={handleDrag} name={product.name} data-modelname={product.name} />
              </div>
            )
          }
        }
      }
      )}
    </div>
  )
}
