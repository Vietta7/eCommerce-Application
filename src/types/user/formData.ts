export type Address = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  id?: string;
  key?: string;
  isShippingDefaultAddress?: boolean;
  isBillingDefaultAddress?: boolean;
};

export type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  shippingAddress: Address;
  billingAddress: Address;
  isBillingSameAsShipping?: boolean;
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  isBillingDefaultAddress?: boolean;
  isShippingDefaultAddress?: boolean;
};

export type FormDataLogin = {
  email: string;
  password: string;
};

export type AddressFormData = {
  shippingAddress: Address;
  billingAddress: Address;
};
