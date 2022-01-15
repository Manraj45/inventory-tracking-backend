import CreateProduct from './CreateProduct';
import { useLocation } from 'react-router';

interface Props {
  id?: string;
}

const EditProduct: React.FC<Props> = ({ id }) => {
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);
  const edit = searchParams.get('edit');

  return (
    <div>
      <CreateProduct id={id} edit={String(edit)}/>
    </div>
  );
};

export default EditProduct;
