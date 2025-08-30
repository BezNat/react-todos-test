import type { Filter } from '../../types/Filter';
import styles from './Footer.module.css'

interface PropsFooter {
  notesCount: number
  filter: Filter
  hasCompletedNotes: boolean
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  onDeleteCompletedNotes: () => void
}

export const Footer: React.FC<PropsFooter> =  ({ notesCount, filter, hasCompletedNotes, setFilter, onDeleteCompletedNotes}) => {
    return (
        <div className={styles.footer}>
            <div className={styles.notesCount}>
                <span id='notesCount'>{notesCount}</span> {notesCount === 1 ? 'item' : 'items'} left 
            </div>

        <div className={styles.filters}>
          <button type="button"
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`} onClick={() => setFilter('all')}>
            All
          </button>

          <button type="button"
            className={`${styles.filterBtn} ${filter === 'active' ? styles.active : ''}`} onClick={() => setFilter('active')}>
            Active
          </button>
          <button  type="button"
            className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`} onClick={() => setFilter('completed')}>
            Completed
          </button>
        </div>

        <button 
          className={styles.clearBtn}
          disabled={!hasCompletedNotes}
          onClick={onDeleteCompletedNotes}>
          Clear completed
        </button>
    </div>
)};