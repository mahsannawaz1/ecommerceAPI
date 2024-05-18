import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CustomArrowProps {
    type: 'PREV' | 'NEXT';
    onClick: () => void;
    isEdge: boolean;
    }

    const CustomArrow: React.FC<CustomArrowProps> = ({ type, onClick, isEdge }) => {
    const arrowStyle: React.CSSProperties = {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [type === 'PREV' ? 'left' : 'right']: '10px',
        opacity: isEdge ? 0.5 : 1,
    };

    return (
        <div onClick={onClick} style={arrowStyle}>
        {type === 'PREV' ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
        </div>
    );
};

export default CustomArrow;