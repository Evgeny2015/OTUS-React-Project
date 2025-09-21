import { useRef, type FC } from "react"
import { Button, Input, Table, Typography, type InputRef, type TableProps } from "antd"

import { CategoryApi } from "../../../app";
import { categoryFilter, type Category } from "../../../entities";


type CategotyItem = Pick<Category, 'name'> & { key: string }
type ColumnTypes = Exclude<TableProps<CategotyItem>['columns'], undefined>


const CategoryPage: FC = () => {
    const inputRef = useRef<InputRef>(null)
    const categoryGet = CategoryApi.useRtkGetCategorysQuery(categoryFilter)
    const [categoryAdd] = CategoryApi.useRtkCreateCategoryMutation()
    const [categoryDelete] = CategoryApi.useRtkDeleteCategoryMutation()
    const categories = categoryGet.data
    const reload = categoryGet.refetch

    const columns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            editable: true
        },
        {
            title: 'Действие',
            dataIndex: '',
            key: 'x',
            editable: false,
            render: (_, record) => <Typography.Link onClick={() => handleDelete(record)}>Delete</Typography.Link>,
        },
    ]

    const handleSave = () => {
        const category = inputRef.current?.input?.value
        if (category)
            categoryAdd({ name: category })
                .unwrap()
                .then(_ => {
                    reload()
                })
                .catch(x => console.error(x))
    }

    const handleDelete = (item: CategotyItem) => {
        categoryDelete(item.key)
            .unwrap()
            .then(_ => reload())
            .catch(x => console.error(x))
    }

    const col = columns.map(x => (
        (!x.editable) ? x :
            {
                ...x,
                onCell: (record: CategotyItem) => ({
                    record,
                    editable: x.editable,
                    dataIndex: x.dataIndex,
                    title: x.title,
                    handleSave
                })
            }
    ))

    return (<>
        <Table<CategotyItem>
            dataSource={(categories) ?
                categories.data.map(x => {
                    return {
                        key: x.id,
                        name: x.name,
                    }
                }) : []
            }
            columns={col as ColumnTypes}
            pagination={false}
            summary={() => {
                return (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>
                                <Input ref={inputRef}></Input>
                            </Table.Summary.Cell>

                            <Table.Summary.Cell index={1}>
                                <Button type="primary" onClick={handleSave}>Добавить</Button>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )
            }}
        />
    </>)
}

export default CategoryPage