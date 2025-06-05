import * as Yup from 'yup'

export const schemaTooList = Yup.object({
  taskName: Yup.string().required("Task is required"),
})
