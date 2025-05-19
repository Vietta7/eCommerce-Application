import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import styles from './FormAddress.module.css';
import { Address, FormData } from '../../types/user/formData';
import { Input } from '../ui/Input/Input';

type AddressType = 'shippingAddress' | 'billingAddress';
type FromAddress = { shippingAddress: Address; billingAddress: Address };

interface FormAddressProps {
  title: string;
  type: AddressType;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FromAddress>;
  watch: (s: string) => string;
}

export const FormAddress: React.FC<FormAddressProps> = ({
  title,
  type,
  register,
  errors,
  watch,
}) => {
  return (
    <div className={styles.address_grid}>
      <h4 className={`${styles.header} ${styles.address}`}>{title}</h4>

      <Input
        className={styles.street}
        label="Street"
        name={`${type}.streetName`}
        placeholder="Street"
        type="text"
        register={register}
        error={errors[type]?.streetName}
        inputValue={watch(`${type}.streetName`)}
      />

      <div className={styles.town_postcode}>
        <Input
          className={styles.town}
          label="City"
          name={`${type}.city`}
          placeholder="City"
          type="text"
          register={register}
          error={errors[type]?.city}
          inputValue={watch(`${type}.city`)}
        />
        <Input
          className={styles.postcode}
          label="Postcode"
          name={`${type}.postalCode`}
          placeholder="Postcode"
          type="text"
          register={register}
          error={errors[type]?.postalCode}
          inputValue={watch(`${type}.postalCode`)}
        />
      </div>

      <div className={`${styles.country} ${styles.select_country}`}>
        <label className={styles.select_label} htmlFor={`${type}.country`}>
          Country
        </label>
        <select
          id={`${type}.country`}
          {...register(`${type}.country` as const)}
          name={`${type}.country`}
        >
          <option value="RU">Russia</option>
          <option value="US">United States</option>
        </select>
        {errors[type]?.country && (
          <span className={styles.select_error_message}>{errors[type]?.country?.message}</span>
        )}
      </div>
    </div>
  );
};
