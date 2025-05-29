import { Address } from './formData';

export type Customer = {
  version: number;
  addresses: Address[];
};

export type ProfileCustomer = AddressCustomer & {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  version: number;
  addresses: Address[];
  email: string;
};

export type AddressCustomer = {
  billingAddressIds: string[];
  shippingAddressIds: string[];
  defaultBillingAddressId: string;
  defaultShippingAddressId: string;
};
