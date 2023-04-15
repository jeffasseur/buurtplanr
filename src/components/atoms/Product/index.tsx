import styles from './styles.module.css'
import productList from './productlist.json'
import { useDroppedModel } from '@/components/zustand/buurtplanrContext';

const Product = () => {
  const updateModel = useDroppedModel(state => state.updateModel)
  const handleDrag = (e) => {
    updateModel(e.target.dataset.modeltype)
  }

  return <>
    {productList.list.map((modelType, index) =>
      <div key={index} className={styles.productListing} draggable="true" onDragStart={handleDrag} data-modeltype={modelType}>
        <p>{modelType}</p>
      </div>
    )}
  </>
}

export default Product