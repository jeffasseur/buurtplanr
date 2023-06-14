import * as Tabs from '@radix-ui/react-tabs'
import { cx } from 'class-variance-authority'
import { useState } from 'react'

import Icon from '@/components/atoms/Icon'

import styles from './styles.module.css'

const BuilderInfo = () => {
  const iconClassName = cx(styles.icon, styles['text-icon'])
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <button onClick={handleOpen} className={styles.button}>
        {!open && <span>?</span>}
        {open && <Icon className={styles.close} name='close-circle' />}
      </button>
      {open && (
        <Tabs.Root className={styles.TabsRoot} defaultValue='tab1'>
          <Tabs.List className={styles.TabsList} aria-label='Manage your account'>
            <Tabs.Trigger className={styles.TabsTrigger} value='tab1'>
              <div className={styles['icon-container']}>
                <Icon name='rotate-left' className={styles.icon} />
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger className={styles.TabsTrigger} value='tab2'>
              <div className={styles['icon-container']}>
                <Icon name='rotate-right' className={styles.icon} />
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger className={styles.TabsTrigger} value='tab3'>
              <div className={styles['icon-container']}>
                <Icon name='move' className={styles.icon} />
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger className={styles.TabsTrigger} value='tab4'>
              <div className={styles['icon-container']}>
                <Icon name='trash' className={styles.icon} />
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger className={styles.TabsTrigger} value='tab5'>
              <div className={styles['icon-container']}>
                <Icon name='save' className={styles.icon} />
              </div>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className={styles.TabsContent} value='tab1'>
            <p>klik op het <span className={styles['text-icon-container']}><Icon name='rotate-left' className={iconClassName} /></span> icoon terwijl je een bouwstuk geselecteerd hebt om dat bouwstuk te doen draaien naar links.</p>
          </Tabs.Content>
          <Tabs.Content className={styles.TabsContent} value='tab2'>
            <p className={styles.Text}>klik op het <span className={styles['text-icon-container']}><Icon name='rotate-right' className={iconClassName} /></span> icoon terwijl je een bouwstuk geselecteerd hebt om dat bouwstuk te doen draaien naar rechts.</p>
          </Tabs.Content>
          <Tabs.Content className={styles.TabsContent} value='tab3'>
            <p className={styles.Text}>klik op het <span className={styles['text-icon-container']}><Icon name='move' className={iconClassName} /></span> icoon terwijl je een bouwstuk geselecteerd hebt om dat bouwstuk te kunnen verplaatsen.</p>
          </Tabs.Content>
          <Tabs.Content className={styles.TabsContent} value='tab4'>
            <p className={styles.Text}>klik op het <span className={styles['text-icon-container']}><Icon name='trash' className={iconClassName} /></span> icoon terwijl  je een bouwstuk geselecteerd hebt om dat bouwstuk te verwijderen.</p>
          </Tabs.Content>
          <Tabs.Content className={styles.TabsContent} value='tab5'>
            <p className={styles.Text}>klik op het <span className={styles['text-icon-container']}><Icon name='save' className={iconClassName} /></span> icoon om je huidige creatie op te slagen.</p>
          </Tabs.Content>
        </Tabs.Root>
      )}
    </>
  )
}

export default BuilderInfo
