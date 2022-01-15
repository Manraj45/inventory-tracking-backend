import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { FormikProps, useFormik } from 'formik';
import { AxiosResponse } from 'axios';
import { createProduct, getProduct, updateProduct } from '../../services/ProductAPI';
import createProductFormValidationSchema from './CreateProductFormValidationSchema';
import createProductStyle from './CreateProductStyle';
import { useHistory } from 'react-router';

interface Props {
  id?: string;
  edit: string;
}

interface CreateProductFormData {
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
}

interface EditFetchData {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
}

const CreateProduct: React.FC<Props> = ({ id, edit }) => {
  const [created, setCreated] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();
  const classes = createProductStyle();

  const formik: FormikProps<CreateProductFormData> = useFormik<CreateProductFormData>({
    onReset: () => {},
    initialValues: {
      name: '',
      description: '',
      sku: '',
      price: 0,
      quantity: 0,
    },
    onSubmit: async (values) => {
      if (editState === 'true') {
        submitEdit();
      } else {
        try {
          const response: AxiosResponse<any> = await createProduct({
              name: values.name,
              desc: values.description,
              sku: values.sku,
              price: values.price,
              quantity: values.quantity,
          });
          if (response.status === 201) {
            setCreated(true);
            history.push('/');
          }
        } catch (e) {
          setError(true);
        }
      }
    },
    validationSchema: createProductFormValidationSchema,
  });
  
  const [editState, setEditState] = useState<string>(edit);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const getEditProductData = async () => {
      if (id) {
        try {
          const productToEdit = await getProduct(id);
          const data: EditFetchData = productToEdit.data;
          if (!productToEdit.data || (editState !== 'true' && editState !== 'false')) {
            history.push('/error');
          }
          formik.setFieldValue('name', data.name);
          formik.setFieldValue('description', data.description);
          formik.setFieldValue('sku', data.sku);
          formik.setFieldValue('price', data.price);
          formik.setFieldValue('quantity', data.quantity);
        } catch (e) {
          history.push('/error');
        }
      }
    };
    getEditProductData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (editState === 'false' && id) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [id, editState]);

  const reset = () => {
    formik.resetForm();
  };

  const handleErrorCreate = () => {
    if (created === true) {
      reset();
      history.push('/');
    }
  };

  const submitEdit = async () => {
      const response: AxiosResponse<any> = await updateProduct({
          id: Number(id),
          name: formik.values.name,
          desc: formik.values.description,
          sku: formik.values.sku,
          price: formik.values.price,
          quantity: formik.values.quantity,
      });

      if (response.status === 200) {
        setCreated(true);
        history.push('/');
      }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', paddingTop: '75px' }}
    >
      <Paper elevation={3} className={classes.createProductPaper}>
        <form onSubmit={formik.handleSubmit}>
          <Grid item container spacing={3} direction="row" xs={12} className={classes.createProductFormWrapper}>
            <Grid item xs={10} style={{ paddingBottom: '0px', paddingTop: '100px' }}>
              <Typography variant="h5" className={classes.productTitle}>
                Product Specification
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ paddingTop: '20px' }}>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                label="Name *"
                name="name"
                fullWidth
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={4} style={{ paddingTop: '20px' }}>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.sku}
                error={formik.touched.sku && Boolean(formik.errors.sku)}
                helperText={formik.touched.sku && formik.errors.sku}
                label="SKU *"
                name="sku"
                fullWidth
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={2} style={{ paddingTop: '20px' }}>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                label="Price *"
                name="price"
                fullWidth
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={2} style={{ paddingTop: '20px' }}>
              <TextField
                onChange={formik.handleChange}
                value={formik.values.quantity}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
                label="Quantity *"
                name="quantity"
                fullWidth
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={6} style={{ paddingTop: '3px' }}>
              <TextField
                id="description"
                label="Description"
                name="description"
                variant="outlined"
                multiline
                rows={3}
                className={classes.descriptionBox}
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                disabled={disabled}
              ></TextField>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 40 }}>
              {editState === 'true' ? (
                <Button color="primary" variant="contained" type="submit" id="save">
                  Save
                </Button>
              ) : id ? (
                <Button
                  id="editButton"
                  color="primary"
                  variant="contained"
                  key="NotSubmit"
                  onClick={() => {
                    setEditState('true');
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Button color="primary" variant="contained" id="submitButton" type="submit" onClick={handleErrorCreate}>
                  Create
                </Button>
              )}
              &nbsp; &nbsp;
              <Button disabled={disabled} type="reset" onClick={reset} color="primary" variant="outlined">
                Clear
              </Button>
            </Grid>
            <Grid item xs={12}>
              {created && (
                <Typography variant="h6" color="primary">
                  Created succesfully
                </Typography>
              )}
              {error && (
                <Typography variant="h6" style={{ color: 'red' }}>
                  Error
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default CreateProduct;
