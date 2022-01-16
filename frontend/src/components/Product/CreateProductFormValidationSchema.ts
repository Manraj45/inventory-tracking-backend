import * as Yup from 'yup';

const createProductFormValidationSchema: Yup.ObjectSchema<any> = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().optional(),
    sku: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive().typeError('Price must be a positive number'),
    quantity: Yup.number().required('Required').positive().integer().typeError('Quantity must be a positive integer'),
});

export default createProductFormValidationSchema;
