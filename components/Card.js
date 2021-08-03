import Popup from 'reactjs-popup';
import styles from '../styles/Home.module.css'
import 'reactjs-popup/dist/index.css';

const Card = ({ title, content, popupContent }) => (
    <Popup 
      trigger={
        <button className={styles.card}>
          <h3>{title}</h3>
          <p>{content}</p>
        </button>
      } 
      position="top center"
    >
      {close => (
        <div className={styles.modalContainer}>
          <button className={styles.modalClose} onClick={close}>
            &times;
          </button>
          <div className={styles.modalHeader}>{title}</div>
          <div className={styles.modalContent}>{popupContent}</div>
        </div>
      )}
    </Popup>
  );

  export default Card;
