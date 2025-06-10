import toast from 'react-hot-toast';

type getImageProduct = {
  productId: string;
  userToken: string;
};

export const getImageProduct = async ({ productId, userToken }: getImageProduct) => {
  try {
    const response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/dino-land/products/${productId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const image = await response.json();

    if (!response.ok) {
      if (image.message) {
        toast.error(image.message);
        throw new Error(image.message);
      }
      throw new Error('Error get image product');
    }

    return image.masterData.current.masterVariant.images[0].url;
  } catch (error) {
    console.error('Error get image product:', error);
    return null;
  }
};
