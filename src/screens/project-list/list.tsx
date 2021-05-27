import React from 'react'
import { Table } from 'antd'
import { User } from 'screens/project-list/search-panel'
import dayjs from 'dayjs'
import { TableProps } from 'antd/lib/table/Table'

export interface Project {
  id: string
  name: string
  personId: string
  pin: boolean
  organization: string
  created: string
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '姓名',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render: (value, project) => <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>,
        },
        {
          title: '创建时间',
          render: (value, project) => <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : ''}</span>,
        },
      ]}
      {...props}
      rowKey={'id'}
    />
  )
}
