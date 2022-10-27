import { Environment } from '../../../environment/index';
import { Api } from "../axios-config"


export interface IListPeople{
  id: number
  lastName: string
  cityId: number
  email: string
}
export interface IDetailPeople{
  id: number
  lastName: string
  cityId: number
  email: string
}
export type TTotalCountPeople = {
 data: IListPeople[]
 totalCount: number
}
const getAll = async (page = 1, filter = ''): Promise<TTotalCountPeople | Error> =>{
  try {
    const urlRelative = `/people?_page=${page}&_limit=${Environment.ROW_LIMITS}&lastName_like=${filter}`
    const {data, headers} = await Api.get(urlRelative)
    if(data){
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.ROW_LIMITS)
      }
    }
    return new Error('Error to list users')
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to list users')
  }
}

const getById = async (id: number): Promise<IDetailPeople | Error> =>{
  try {
    const urlRelative = `/people/${id}`
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

const create = async (dataPassed: Omit<IDetailPeople, 'id'>): Promise<number | Error> =>{
  try {
    const urlRelative = `/people`
    const {data} = await Api.post<IDetailPeople>(urlRelative, dataPassed)
    if(data){
        return data.id
    }
    return new Error('Error to create user')
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to create user')
  }
}

const updateById = async (id: number, dataPassed: IDetailPeople): Promise<void | Error> =>{
  try {
    const urlRelative = `/people/${id}`
    await Api.put(urlRelative, dataPassed)
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to update user')
  }
}

const deleteById = async (id: number): Promise<void | Error> =>{
  try {
    const urlRelative = `/people/${id}`
    await Api.delete(urlRelative)
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to delete user')
  }
}

export const PeopleService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}