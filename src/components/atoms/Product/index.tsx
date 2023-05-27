import { useDroppedModel } from '@/components/zustand/buurtplanrContext'
import productList from '@/helpers/ProductList.json'

import WebpIcon from '../webpIcons'

import styles from './styles.module.css'

interface ProductProps {
  productType: string | null
}

export const Product = ({ productType }: ProductProps) => {
  const updateModel = useDroppedModel(state => state.updateModel)
  const modelName = useDroppedModel(state => state.model)
  const pType = useDroppedModel(state => state.productType)
  const updateProductType = useDroppedModel(state => state.updateProductType)

  const handleClick = (e) => {
    let current = e.target
    while (!current.dataset.modelname) {
      current = current.parentNode
    }
    modelName === current.dataset.modelname ? updateModel(null) : updateModel(current.dataset.modelname)
    pType === current.dataset.producttype ? updateProductType(null) : updateProductType(current.dataset.producttype)
  }

  return (
    <div className={styles.productList}>
      {productList.list.map((product, index) => {
        if (productType == null) {
          return (
            <div key={index} className={`${modelName === product.name ? styles.active : ''} ${styles.productListing}`} onClick={handleClick} data-modelname={product.name} data-producttype={product.productType}>
              <WebpIcon id='img' productType={null} name={product.name} />
            </div>
          )
        }
        if (productType === product.productType) {
          if (product.name) {
            return (
              <div key={index} className={`${modelName === product.name ? styles.active : ''} ${styles.productListing}`} onClick={handleClick} data-modelname={product.name} data-producttype={product.productType}>
                <WebpIcon id='img' productType={productType} name={product.name} />
              </div>
            )
          }
        }
      }
      )}
    </div>
  )
}
