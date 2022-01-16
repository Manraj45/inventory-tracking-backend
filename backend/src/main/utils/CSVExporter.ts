import { FieldInfo, Parser } from 'json2csv';
import { Product } from '../models/Product';

// Export data to csv
export const exportDataToCSV = (fields: FieldInfo<Product>[], data: Product[]): string => {
    const json2csv = new Parser({ fields });
    const csv = json2csv.parse(data);
    return csv;
}