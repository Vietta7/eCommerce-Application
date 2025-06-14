import styles from './AboutCard.module.css';
import { CardAboutDevelop } from '../../types/common';
import { Link } from 'react-router-dom';

export const AboutCard = (props: CardAboutDevelop) => {
  const { description, img, link, name, title, linkSrc } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.image_wrapper}>
        <img className={styles.img} src={img} alt="developer image" />
      </div>
      <div className={styles.content}>
        <div className={styles.name_wrapper}>
          <span className={styles.name}>{name}</span>
          <Link to={linkSrc} className={styles.link}>
            {link}
          </Link>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default AboutCard;
