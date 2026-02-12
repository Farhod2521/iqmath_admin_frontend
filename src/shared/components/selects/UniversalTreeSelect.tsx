import { TreeSelect } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { getSelectorTreeSelect } from '@/services'

export interface UniversalTreeSelectProps {
  name?: string
  placeholder?: string
  parentField?: string
  form: any
  onChange?: (value: any, option: any) => void
}

interface TreeOptionType {
  id: string | number
  name: string
  children?: TreeOptionType[]
}

export default function UniversalTreeSelect(props: UniversalTreeSelectProps) {
  const { name, placeholder, parentField, form, onChange } = props

  const values = form?.getFieldsValue ? form.getFieldsValue() : {}
  const parentValue = parentField ? values?.[parentField] : undefined

  const isDisabled = useMemo(() => Boolean(parentField) && !parentValue, [parentField, parentValue])

  const [options, setOptions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const convertToTreeData = (nodes: TreeOptionType[] = []): any[] =>
    nodes.map((n) => {
      const children = Array.isArray(n.children) ? n.children : []
      const hasChildren = children.length > 0

      return {
        value: n.id.toString(),
        label: n?.name,
        selectable: !hasChildren, // children borlar tanlanmaydi
        children: hasChildren ? convertToTreeData(children) : undefined
      }
    })

  useEffect(() => {
    if (isDisabled) return

    setLoading(true)

    getSelectorTreeSelect()
      .then((res) => {
        const raw: TreeOptionType[] = Array.isArray(res?.data) ? (res.data as any).flat() : []
        setOptions(convertToTreeData(raw))
      })
      .finally(() => setLoading(false))
  }, [parentValue, isDisabled])

  // parentField o‘zgarganda value reset qilish
  useEffect(() => {
    if (form && name && parentField) {
      form.setFieldsValue({ [name]: null })
    }
  }, [parentValue])

  const handleChange = (val: any, option: any) => {
    if (form && name) {
      form.setFieldsValue({ [name]: val?.toString() })
    }

    if (onChange) onChange(val?.toString(), option)
  }

  const value = name && form ? form.getFieldValue(name) : undefined

  return (
    <TreeSelect
      treeData={options}
      disabled={isDisabled}
      allowClear
      loading={loading}
      showSearch
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      treeDefaultExpandAll={false}
      treeExpandAction="click"
      classNames={{
        popup: {
          root: 'tree_select_popup'
        }
      }}
    />
  )
}
