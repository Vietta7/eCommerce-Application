import { useState } from 'react';
import TextInput from '../../ui-kit/TextInput/TextInput';
import styles from './HeadingStore.module.css';

export default function HeadingStore() {
  const [value, setValue] = useState('');
  return (
    <div>
      <h1 className={styles.title}>Dino Land Store!!!</h1>
      <TextInput value={value} onChange={setValue} />
    </div>
  );
}
