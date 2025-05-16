export type Address = {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
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
