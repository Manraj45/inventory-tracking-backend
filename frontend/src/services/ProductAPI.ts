import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ProductCreationDTO, ProductUpdateDTO } from '../dto/ProductDTOs';

export const createProduct = async (productCreationDTO: ProductCreationDTO): Promise<AxiosResponse<any>> => {
    return axios.post(`/product`, productCreationDTO);
};

export const getAllProducts = async (): Promise<AxiosResponse<any>> => {
    return axios.get(`/products`);
};

export const getProduct = async (productId: string): Promise<AxiosResponse<any>> => {
    return axios.get(`/product/${productId}`);
};

export const deleteProduct = async (productId: string): Promise<AxiosPromise<any>> => {
    return axios.delete(`/product/${productId}`);
};

export const updateProduct = async (productUpdateDTO: ProductUpdateDTO): Promise<AxiosPromise<any>> => {
    return axios.put(`/product/${productUpdateDTO.id}`, productUpdateDTO);
};

export const downloadProduct = async (): Promise<AxiosPromise<any>> => {
    return axios.get(`/download`);
};