
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface CustomModalProps {
    onClick: () => void;
    visible: boolean;
    style?: React.CSSProperties;
    onHide: () => void;
    children?: React.ReactNode; 
    header?:string
}

const CustomModal: React.FC<CustomModalProps> = ({ onClick, visible, style, onHide,children , header}) => {
    const [internalVisible, setInternalVisible] = useState<boolean>(false);

    return (
        <div className="card flex justify-content-center">
            <Button label="Show" icon="pi pi-external-link" onClick={() => { onClick(); setInternalVisible(true); }} />
            <Dialog header={header} visible={visible || internalVisible}  style={style} onHide={() => { onHide(); setInternalVisible(false); }}>
               {children}
            </Dialog>
        </div>
    );
}

export default CustomModal;

// import React from "react";
// import { CSSProperties } from 'react';
// import { Dialog } from 'primereact/dialog';

// interface ButtonProps {
//     label: string;
//     icon?: string;
//     onClick?: () => void;
// }

// interface CustomModalProps {
//     onClick?: () => void; // Add onClick prop
//     visible: boolean;
//     style?: CSSProperties;
//     onHide: () => void;
//     children?: React.ReactNode; 
//     header?: string;
//     buttonProps?: ButtonProps; // Add buttonProps prop
// }

// const CustomModal: React.FC<CustomModalProps> = ({ onClick, visible, style, onHide, children, header, buttonProps }) => {
//     const [internalVisible, setInternalVisible] = React.useState<boolean>(false);

//     return (
//         <div className="card flex justify-content-center">
//             {buttonProps && <button {...buttonProps} onClick={() => { buttonProps.onClick && buttonProps.onClick(); setInternalVisible(true); }} />} {/* Render button if buttonProps provided */}
//             <Dialog header={header} visible={visible || internalVisible} style={style} onHide={() => { onHide(); setInternalVisible(false); }}>
//                {children}
//             </Dialog>
//         </div>
//     );
// }

// export default CustomModal;
