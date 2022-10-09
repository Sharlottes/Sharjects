import Box, { type BoxProps } from '@mui/material/Box' 
import Typography, { type TypographyProps } from '@mui/material/Typography';
import { motion, MotionProps, useAnimationControls } from 'framer-motion';
import React from 'react';
import { listAnimatonRefType } from 'src/@type';

const ProgressiveTypography: React.FC<{ 
    label: string,
    speed?: number | undefined,
    animateRef?: listAnimatonRefType | undefined
} 
    & Omit<TypographyProps, 'ref'> 
    & { motion?: MotionProps | undefined } 
    & { box?: BoxProps | undefined}
> = ({ 
    label,
    speed = 0.1,
    animateRef,
    motion: motionProps,
    box: boxProps,
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
        <Box style={{ display: 'flex' }} {...boxProps}>
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
        </Box>
    );
}
export default ProgressiveTypography;