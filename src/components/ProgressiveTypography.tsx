import { Typography, type TypographyProps } from '@mui/material';
import { motion, MotionProps, useAnimationControls } from 'framer-motion';
import React from 'react';

const ProgressiveTypography: React.FC<{ 
    label: string,
    speed?: number | undefined,
    animateRef?: React.MutableRefObject<{ start: (delay: number)=>void } | undefined> | undefined,
} & Omit<TypographyProps, 'ref'> & { motion?: MotionProps | undefined }> = ({ 
    label,
    speed = 0.1,
    motion: motionProps,
    animateRef,
    ...props 
}) => {
    const control = useAnimationControls();

    if(animateRef) animateRef.current = {
        start: (delay: number) => {
            control.start((i: number) => {
                console.log('start');

                return ({
                    opacity: 1,
                    transition: {
                        delay: delay + i * speed,
                    },
                })
            }).then(()=>console.log('done!'));
        }
    }

    //mui의 Typography가 내 생각보다 무겁지 않기를 빌며...
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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