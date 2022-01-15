import * as Yup from 'yup';

const createProductFormValidationSchema: Yup.ObjectSchema<any> = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().optional(),
    sku: Yup.string().required('Required'),
    price: Yup.number().required('Required'),
    quantity: Yup.number().required('Required'),
});

export default createProductFormValidationSchema;
