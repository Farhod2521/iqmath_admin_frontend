export const getValidateProps = (formik: any, key: string) => {
  const hasError = formik.errors[key]
  return {
    validateStatus: hasError ? ('error' as const) : undefined,
    help: hasError ? String(formik.errors[key]) : undefined
  }
}
