import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Address } from '../../types/user/formData';
import { Input } from '../ui/Input/Input';
import styles from './AddressEditor.module.css';
import { addressesSchema, AddressShippingFormData } from '../../schemas/address.shema';
import { SubmitButton } from '../ui/SubmitButton/SubmitButton';
import { useEffect, useState } from 'react';
import { EditButton } from '../ui/EditButton/EditButton';
import { DeleteButton } from '../ui/DeleteButton/DeleteButton';
import { CheckBox } from '../ui/CheckBox/CheckBox';

interface AddressEditorProps {
  initialAddress: Address;
  addressId: string;
  onSubmit: (data: Address) => void;
  onRemoveAddress: (addressId: string) => void;
  isDefault: boolean;
}

export const AddressEditor = ({
  initialAddress,
  addressId,
  isDefault,
  onSubmit,
  onRemoveAddress,
}: AddressEditorProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,

    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
  } = useForm<AddressShippingFormData>({
    defaultValues: { ...initialAddress, isShippingDefaultAddress: isDefault },
    resolver: zodResolver(addressesSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (initialAddress) {
      reset({ ...initialAddress, isShippingDefaultAddress: isDefault });
    }
  }, [initialAddress, isDefault, reset]);

  const [isEdit, setIsEdit] = useState<boolean>(!!addressId);

  const handleClickEdit = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsEdit(true);
    }
  }, [isSubmitSuccessful]);

  return (
    <form className={styles.address_grid} onSubmit={handleSubmit(onSubmit)}>
      <Input
        className={styles.street}
        label="Street"
        name="streetName"
        placeholder="Street"
        type="text"
        register={register}
        error={errors.streetName}
        inputValue={watch('streetName')}
        disabled={isEdit}
      />
      <div className={styles.town_postcode}>
        <Input
          className={styles.town}
          label="City"
          name="city"
          placeholder="City"
          type="text"
          register={register}
          error={errors.city}
          inputValue={watch('city')}
          disabled={isEdit}
        />
        <Input
          className={styles.postcode}
          label="Postal Code"
          name="postalCode"
          placeholder="Postal Code"
          type="text"
          register={register}
          error={errors.postalCode}
          inputValue={watch('postalCode')}
          disabled={isEdit}
        />
      </div>

      <div className={`${styles.country} ${styles.select_country}`}>
        <label className={styles.select_label} htmlFor="country">
          Country
        </label>
        <select id="country" {...register('country')} disabled={isEdit}>
          <option value="RU">Russia</option>
          <option value="US">United States</option>
        </select>
      </div>

      <div className={styles.default_billing_checkbox}>
        <CheckBox
          label="Use as default address"
          {...register('isShippingDefaultAddress')}
          disabled={isEdit}
        />
      </div>

      {isEdit ? (
        <EditButton className={styles.edit_btn} onClick={handleClickEdit} />
      ) : (
        <SubmitButton isDisabled={!isValid} isLoading={isSubmitting} className={styles.submit_btn}>
          Save
        </SubmitButton>
      )}
      {isEdit && (
        <DeleteButton className={styles.delete_btn} onClick={() => onRemoveAddress(addressId)} />
      )}
    </form>
  );
};
