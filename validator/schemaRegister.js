import * as Yup from 'yup'

export const schemaLogin = Yup.object({
  username: Yup.string().max(30).required("Username is required"),
  password: Yup.string().max(20).required("Password is required"),
})