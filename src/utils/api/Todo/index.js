import api from ".."
import { paths } from "../endPoint"



export const createList  = async (data) =>{
    const url = await api.post(paths.addList,data)
    return url?.data
}
export const getList  = async () =>{
    const url = await api.get(paths.getList)
    return url?.data
}
export const deleteList  = async (id) =>{
    const url = await api.delete(paths.deleteList+id)
    return url.data
}
export const updateList  = async (selectedData) =>{
    const data = {listName:selectedData.name}
    console.log(data,"data of edit")
    const url = await api.put(paths.updateList+selectedData.id,data)
    return url
}