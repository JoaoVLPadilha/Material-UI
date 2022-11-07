import { Api } from "../axios-config"

interface IAuth {
  accessToken: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> =>{
  try {
    const urlRelative = `/auth`
    const {data} = await Api.get(urlRelative, {data:{email, password}})
    if(data){
        return data
    }
    return new Error('Error to Log in')
  } catch (error) {
    console.error(error)
    return new Error((error as {message:string}).message || 'Error to Log in')
  }
}


export const AuthService = {
  auth
}