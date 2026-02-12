import { Table, TableProps, Tag } from 'antd'

type PropsType = {
  pagination: any
  totalTitle?: string
} & TableProps<any>

function TableComponent({ pagination, className, totalTitle = 'Jami', ...props }: PropsType) {
  return (
    <Table
      scroll={{ x: 1000 }}
      size="small"
      rowKey={props.rowKey || ((record: any) => record?.id)}
      className={`table_wrapper ${className}`}
      pagination={{
        ...pagination,
        pageSizeOptions: [10, 20, 30, 50, 70, 100],
        showSizeChanger: true,
        locale: { items_per_page: '' },
        showTotal: (total, rage) => (
          <Tag className="pagination_tag">
            {totalTitle}: <b>{total}</b>
          </Tag>
        )
      }}
      {...props}
    />
  )
}

export default TableComponent
