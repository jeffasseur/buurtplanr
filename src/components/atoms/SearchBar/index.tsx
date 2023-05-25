import Icon from '@/components/atoms/Icon'

import styles from './styles.module.css'

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input type='text' placeholder='Zoeken' className={styles.searchBar_input} />
      <Icon name='save' className={styles.input_icon} />
    </div>
  )
}

export default SearchBar
