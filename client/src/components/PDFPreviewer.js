import React from 'react'

import PDFViewer from 'pdf-viewer-reactjs'

const PDFPreviewer = (props) => {
    let path = props.filePath[0]
    console.log(path)
    return (
        <PDFViewer
            document={{
                file: path,
            }}
        />
    )
}

export default PDFPreviewer