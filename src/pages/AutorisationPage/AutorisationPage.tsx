import styles from './AutorisationPage.module.css';
import logo from '../../../public/logo.svg';
import TextInput from '../../ui-kit/TextInput/TextInput';
import { useState } from 'react';
import { ZodType, z } from 'zod';

type FormData = {
  email: string;
  password: string;
};

const formSchema: ZodType<FormData> = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Must include a lowercase letter')
    .regex(/[A-Z]/, 'Must include an uppercase letter')
    .regex(/\d/, 'Must include a number'),
});

export default function AutorisationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const onclickHandler = () => {
    const formData = { email, password };
    const res = formSchema.safeParse(formData);

    if (!res.success) {
      const fieldErrors: Partial<FormData> = {};
      res.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title_wrapper}>
          <img className={styles.icon} src={logo} alt="logo" />
          <h1 className={styles.title}>DINO-LAND</h1>
        </div>
        <div className={styles.input__container}>
          <TextInput onChange={setEmail} value={email} label="Email address" placeholder="Email" />
          <div className={styles.error}>{errors.email}</div>
          <TextInput
            onChange={setPassword}
            value={password}
            label="Password"
            placeholder="Password"
          />
          <div className={styles.error}>{errors.password}</div>
        </div>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={onclickHandler}>
            Log In
          </button>
          <div className={styles.navigation}>
            <p className={styles.p}>Don`t have an account?</p>
            <a href="">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}
