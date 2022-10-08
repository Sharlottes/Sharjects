import { Typography, type TypographyProps } from '@mui/material';
import { motion, MotionProps, useAnimationControls } from 'framer-motion';
import React from 'react';
import { listAnimatonRefType } from 'src/@type';

const ProgressiveTypography: React.FC<{ 
    label: string,
    speed?: number | undefined,
    animateRef?: listAnimatonRefType | undefined,
    align?: 'left' | 'center' | 'right'
} & Omit<TypographyProps, 'ref'> & { motion?: MotionProps | undefined }> = ({ 
    label,
    speed = 0.1,
    motion: motionProps,
    animateRef,
    align = 'center',
    ...props 
}) => {
    const control = useAnimationControls();

    React.useEffect(()=>{
        animateRef?.list.push((delay: number) => {
            control.start((i: number) => ({
                opacity: 1,
                transition: {
                    delay: delay + i * speed,
                },
            }));
        })
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: align }}>
        {label.split('').map((char, i) => 
        <motion.div
            key={i}  
            custom={i}
            initial={{ opacity: 0 }}
            animate={control}
            variants={{ show: { opacity: 1, transition: { delay: i * speed } }}}
            {...motionProps}
        >  {/* 원하는 속성에 'visible' 부여*/}
            <Typography {...props}>{char}</Typography>
        </motion.div>
        )}
        </div>
    );
}
export default ProgressiveTypography;