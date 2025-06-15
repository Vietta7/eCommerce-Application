import { FormDataLogin } from './user/formData';

export type InputArray = {
  label: string;
  type: keyof FormDataLogin;
};

export interface CardAboutDevelop {
  img: string;
  title: string;
  link: string;
  linkSrc: string;
  description: string;
  name: string;
}

export interface AboutStack {
  imgSrc: string;
  linkSrc: string;
}
