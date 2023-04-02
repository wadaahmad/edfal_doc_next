import restApi from "../restApi"


export function useImageApi() {
  async function uploadImage(file: any): Promise<any> {
    var formData = new FormData()
    if (Array.isArray(file)) {
      file.forEach((value, index) => {
        formData.append('images[]', value)
      })
    } else {
      formData.append('images', file)
    }
    return await restApi
      .$post(process.env.EDFAL_IMAGE_HOST + '/image', formData, true)
  }
  return {
    uploadImage
  }
}