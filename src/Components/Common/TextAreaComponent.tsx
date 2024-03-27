import React, { useState, ChangeEvent } from "react";
import { InputTextarea } from "primereact/inputtextarea";

interface TextAreaComponentProps {
    value?: string;
    onChange: (value: string) => void;
    rows?: number;
    cols?: number;
}

function TextAreaComponent({ value = '', onChange, rows = 5, cols = 30 }: TextAreaComponentProps) {
    return (
        <div className="card flex justify-content-center">
            <InputTextarea
                autoResize
                value={value}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
                rows={rows}
                cols={cols}
            />
        </div>
    );
}

export default TextAreaComponent;
