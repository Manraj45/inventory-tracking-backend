import * as React from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@material-ui/data-grid';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { getAllProducts, deleteProduct } from '../../services/ProductAPI';
import { Button, Grid, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

interface Data {
    id: number;
    name: string;
    desc: string;
    sku: string;
    price: number;
    quantity: number;
    created_at: string;
    modified_at: string;
    deleted_at: string;
}
interface DataDisplay {
    id: number;
    name: string;
    description: string;
    sku: string;
    price: number;
    quantity: number;
    created_at: string;
    modified_at: string;
    delete: { id:number, delete_at?:string };
    edit: { id:number, delete_at?:string };
}

const ViewProduct: React.FC = () => {
  const [productList, setProductList] = useState<any>([]);
  const [deletedProduct, setDeletedProduct] = useState<any>([]);
  const [nonDeletedProduct, setNonDeletedProduct] = useState<any>([]);
  const history = useHistory();
  const [deleted, setDeleted] = useState<boolean>(false);

  const [select, setSelection] = useState<GridSelectionModel>();
  const handleRowSelection = (id: GridSelectionModel) => {
    setSelection(id);
  };

  const clickAddProduct = () => {
    history.push('/product');
  };

  const submitDelete = async (productId: string) => {
    const response: AxiosResponse<any> = await deleteProduct(productId);
    if (response.status === 200) {
      history.push('/');
    }
  };

  const handleToggle = async () => {
    setDeleted(!deleted);
  };

  useEffect(() => {
    if (deleted === true) {
      setProductList(deletedProduct);
    } else {
      setProductList(nonDeletedProduct);
    }
  }, [deleted, deletedProduct, nonDeletedProduct]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getAllProducts();
      const notDeletedProductList: DataDisplay[] = [];
      const deletedProductList: DataDisplay[] = [];
      products.data.forEach((element: Data) => {
        const createdAtDate = element.created_at.split('T');
        const modifiedAtDate = element.modified_at.split('T');

        const dataDisplay: DataDisplay = {
          id: element.id,
          name: element.name,
          description: element.desc,
          sku: element.sku,
          price: element.price,
          quantity: element.quantity,
          created_at: createdAtDate[0],
          modified_at: modifiedAtDate[0],
          delete: {id:element.id, delete_at:element.deleted_at},
          edit: {id:element.id, delete_at:element.deleted_at},
        };

        if (element.deleted_at != null) {
            deletedProductList.unshift(dataDisplay);
        } else {
            notDeletedProductList.unshift(dataDisplay);
        }
      });

      setNonDeletedProduct(notDeletedProductList);
      setDeletedProduct(deletedProductList);
    };

    fetchData();
  }, [select]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: false,
    },
    {
      field: 'sku',
      headerName: 'SKU',
      width: 150,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Price ($)',
      width: 150,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
      editable: false,
    },
    {
      field: 'created_at',
      headerName: 'Created Date',
      width: 170,
      editable: false,
    },
    {
      field: 'modified_at',
      headerName: 'Modified Date',
      width: 200,
      editable: false,
    },
    {
      field: 'edit',
      headerName: ' ',
      width: 200,
      editable: false,
      renderCell: (params: any) => {
        if(params.value.delete_at === null){
            return <Link href={`/product/edit/${params.value.id}?edit=false`}>Edit</Link>;
        } else {
            return 'Deleted Date: ' + params.value.delete_at.split('T')[0];
        }
      },
    },
    {
      field: 'delete',
      headerName: ' ',
      width: 70,
      editable: false,
      renderCell: (params: any) => {
        if(params.value.delete_at === null){
            return <Link onClick={() => submitDelete(params.value.id)}>Delete</Link>;
        } else {
            return "";
        }
      },
    },
  ];

  return (
    <Grid
      id="View-Product-Grid"
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignContent="center"
      style={{ minHeight: '100vh', paddingTop: '75px' }}
    >
      <div style={{ height: 650, width: '100%' }}>
        <Grid item container spacing={3} direction="row" xs={12}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              style={{ width: '150px', marginBottom: 10, marginRight: 5, alignItems: 'right' }}
              color="primary"
              component="span"
              onClick={clickAddProduct}
            >
              Add Product
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="deleted"
                  labelPlacement="start"
                  control={<Switch color="primary" />}
                  style={{ minWidth: '150px', marginBottom: 10, marginRight: 70, alignItems: 'right' }}
                  label="View Deleted Products"
                  onClick={() => handleToggle()}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ height: 560, width: '100%' }}>
            {' '}
            <DataGrid
              style={{ maxWidth: '75%', margin: 'auto' }}
              rows={productList}
              columns={columns}
              pageSize={8}
              onSelectionModelChange={handleRowSelection}
            />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default ViewProduct;
