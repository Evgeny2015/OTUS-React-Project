import type { FC } from "react"
import { Select, type SelectProps } from "antd"


export type CategorySelector = {
    options: SelectProps['options']
    defaults: string[]
    onChange: (selected: string[]) => void
}

const CategorySelector: FC<CategorySelector> = ({ options, defaults, onChange }) => {
    return (
        <Select
            mode="multiple"
            defaultValue={defaults}
            style={{ width: '100%' }}
            options={options}
            onChange={onChange}
        />
    )
}

export default CategorySelector