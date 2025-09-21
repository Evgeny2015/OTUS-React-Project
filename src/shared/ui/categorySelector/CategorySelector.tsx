import type { FC } from "react"
import { Select, type SelectProps } from "antd"


export type CategorySelector = {
    defaults: string[]
    options: SelectProps['options']
    multiple: boolean
    onChange: (selected: string | string[]) => void
}

const CategorySelector: FC<CategorySelector> = ({ options, defaults, multiple, onChange }) => {
    return (
        <Select
            mode={multiple ? "multiple" : undefined}
            defaultValue={defaults}
            style={{ width: '100%' }}
            options={options}
            onChange={onChange}
        />
    )
}

export default CategorySelector