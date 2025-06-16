import { Link } from 'react-router-dom';
import AboutCard from '../../components/AboutCard/AboutCard';
import { DEVELOPERS_DATA, STACK_DATA } from '../../data/data';
import styles from './AboutPage.module.css';

import RSLogo from '../../assets/img/rss-logo.svg';

const AboutPage = () => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        Yo-team: Small Team, Big Ideas <br /> Anna, Dmitry, Ekaterina — meet the minds behind the
        dinos
      </h1>
      <div className={styles.description_wrapper}>
        <p className={styles.description}>
          Our team worked closely together from the very first idea to the final implementation. We
          held regular calls, stayed in touch via Telegram, and supported one another throughout the
          process. Everyone brought unique strengths — from API integration to design, content
          creation, and team coordination. The collaboration was friendly, efficient, and full of
          enthusiasm. Thanks to this synergy, we turned a small concept into a complete,
          well-rounded project we are proud of.
        </p>
        <Link className={styles.rss} to="https://rs.school/">
          <img src={RSLogo} alt="RS-Logo" />
        </Link>
      </div>
      <div className={styles.list}>
        {DEVELOPERS_DATA.map((item, index) => {
          return <AboutCard {...item} key={index} />;
        })}
      </div>
      <div>
        <h3 className={styles.subtitle}>Our Stack</h3>
        <div className={styles.icon_wrapper}>
          {STACK_DATA.map((item, idx) => {
            return (
              <div key={idx}>
                <Link to={item.linkSrc}>
                  <img className={styles.icon} src={item.imgSrc} alt="" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
