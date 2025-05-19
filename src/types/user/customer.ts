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
