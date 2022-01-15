import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ProductCreationDTO, ProductUpdateDTO, ProductDeleteDTO } from '../dto/ProductDTOs';

export const createProduct = async (productCreationDTO: ProductCreationDTO): Promise<AxiosResponse<any>> => {
    return axios.post(`/product`, productCreationDTO);
};

export const getAllProducts = async (): Promise<AxiosResponse<any>> => {
    return axios.get(`/products`);
};

export const getProduct = async (productId: string): Promise<AxiosResponse<any>> => {
    return axios.get(`/projuct/${productId}`);
};

export const deleteProduct = async (productDeleteDTO: ProductDeleteDTO): Promise<AxiosPromise<any>> => {
    return axios.delete(`/product/${productDeleteDTO.id}`);
};

export const updateProduct = async (productUpdateDTO: ProductUpdateDTO): Promise<AxiosPromise<any>> => {
    return axios.put(`/product/${productUpdateDTO.id}`, productUpdateDTO);
};
