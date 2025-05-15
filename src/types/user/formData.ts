export type address = {
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
  shippingAddress: address;
  billingAddress: address;
};
