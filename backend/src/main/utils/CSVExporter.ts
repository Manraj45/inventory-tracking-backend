import { FieldInfo, Parser } from 'json2csv';
import { Product } from '../models/Product';

export const downloadResource = (fields: FieldInfo<Product>[], data: Product[]): string => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    return csv;
}