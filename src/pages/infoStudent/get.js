



export const Get = async (AxiosConfigsToken,id) => {
    const res = await AxiosConfigsToken.get(`/get_student/${id}`)
    const data = res.data.data
    //console.log(data,'sssssssss')
    return data
}