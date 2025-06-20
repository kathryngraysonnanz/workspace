import React from 'react';
import { TextArea } from '@progress/kendo-react-inputs';

const NoteTakingArea = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Note Taking</h2>
            <TextArea
                id="notes-textarea"
                style={{ height: '200px', width: '100%' }}
                placeholder="Start typing your notes here..."
            />
        </div>
    );
}

export default NoteTakingArea;