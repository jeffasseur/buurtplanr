import { useDroppedModel } from '@/components/zustand/buurtplanrContext'

import WebpIcon from '../webpIcons'

import productList from './productlist.json'
import styles from './styles.module.css'

export const Product = () => {
  const updateModel = useDroppedModel(state => state.updateModel)
  const handleDrag = (e) => {
    updateModel(e.target.dataset.modeltype)
  }

  return (
    <div className={styles.productList}>
      {productList.list.map((modelType, index) =>
        <div key={index} className={styles.productListing} draggable='true' onDragStart={handleDrag} data-modeltype={modelType}>
          <WebpIcon onDragStart={handleDrag} name={modelType} data-modeltype={modelType} />
        </div>
      )}
    </div>
  )
}
