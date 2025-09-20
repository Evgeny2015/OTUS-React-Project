import React, { type FC } from "react"
import './upload.css'

export type UploadProps = {
    accept?: string
    children?: React.ReactNode
    onUpload: (file: File) => void
}

const Upload: FC<UploadProps> = ({ accept, children, onUpload }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files)
            onUpload(event.target.files[0]);
    };

    return (
        <label
            className="upload-label"
            htmlFor='upload-input'
        >
            {children}
            <input
                className='upload-input'
                type='file'
                id='upload-input'
                accept={accept}
                onChange={handleFileChange}
            />
        </label>
    )
}

export default Upload