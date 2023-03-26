import styles from './styles.module.css'
import { useDroppedModel } from '@/components/zustand/buurtplanrContext';

const Product = () => {
  const updateModel = useDroppedModel(state => state.updateModel),
    model = useDroppedModel(state => state.model),
    modelType = "donut",
    handleDrag = (e) => {
      updateModel(e.target.dataset.modeltype)
    }
  return (
    <div className={styles.productListing} draggable="true" onDragStart={handleDrag} data-modeltype={modelType}></div>
  )
}

export default Product
