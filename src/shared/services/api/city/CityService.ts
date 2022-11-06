import { Environment } from '../../../environment/index';
import { Api } from "../axios-config"


export interface IListCity{
  id: number
  name: string
}
export interface IDetailCity{
  id: number
  name: string
}
export type TTotalCountCity = {
 data: IListCity[]
 totalCount: number
}
const getAll = async (page = 1, filter = '', id=''): Promise<TTotalCountCity | Error> =>{
  try {
    const urlRelative = `/city?_page=${page}&_limit=${Environment.ROW_LIMITS}&name_like=${filter}&id_like=${id}`
    const {data, headers} = await Api.get(urlRelative)
    if(data){
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.ROW_LIMITS)
      }
    }
    return new Error('Error to list cities')
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to list cities')
  }
}

const getById = async (id: number): Promise<IDetailCity | Error> =>{
  try {
    const urlRelative = `/city/${id}`
    const {data} = await Api.get(urlRelative)
    if(data){
        return data
    }
    return new Error('Error to consult users')
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to consult users')
  }
}

const create = async (dataPassed: Omit<IDetailCity, 'id'>): Promise<number | Error> =>{
  try {
    const urlRelative = `/city`
    const {data} = await Api.post<IDetailCity>(urlRelative, dataPassed)
    if(data){
        return data.id
    }
    return new Error('Error to add city')
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to create user')
  }
}

const updateById = async (id: number, dataPassed: IDetailCity): Promise<void | Error> =>{
  try {
    const urlRelative = `/city/${id}`
    await Api.put(urlRelative, dataPassed)
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to update city')
  }
}

const deleteById = async (id: number): Promise<void | Error> =>{
  try {
    const urlRelative = `/city/${id}`
    await Api.delete(urlRelative)
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to delete city')
  }
}

export const CityService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}