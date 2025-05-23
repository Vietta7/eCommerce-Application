export type Customer = {
  version: number;
  addresses: {
    id: string;
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  }[];
};

export type ProfileCustomer = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  version: number;
};
