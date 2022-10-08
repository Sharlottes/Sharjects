import { Typography, type TypographyProps } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';

const ProgressiveTypography: React.FC<{ 
    label: string, 
    speed?: number 
} & TypographyProps> = ({ 
    label,
    speed = 0.1, 
    ...props 
}) => {
    const variants = {
        visible: (i: number) => ({
        opacity: 1,
        transition: {
            delay: i * speed,
        },
        }),
        hidden: { opacity: 0 },
    }
    //mui의 Typography가 내 생각보다 무겁지 않기를 빌며...
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        {label.split('').map((char, i) => 
        <motion.div
            key={i}  
            custom={i}
            initial='hidden'
            animate="visible"
            variants={variants}
            whileInView='visible'
        >
            <Typography {...props}>{char}</Typography>
        </motion.div>
        )}
        </div>
    );
}
export default ProgressiveTypography;