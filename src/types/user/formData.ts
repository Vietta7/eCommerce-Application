export type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
  };
};

export type FormDataLogin = {
  email: string;
  password: string;
};
