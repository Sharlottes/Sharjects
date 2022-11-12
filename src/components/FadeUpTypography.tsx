import React from 'react';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import { motion, type MotionProps, useAnimationControls } from 'framer-motion';
import type { listAnimatonRefType } from 'src/@type';

const FadeUpTypography: React.FC<{
    label?: string | undefined,
    animateRef?: listAnimatonRefType | undefined
} & TypographyProps & { motion?: MotionProps }> = ({
    label,
    children,
    motion: motionProps,
    animateRef,
    ...props
}) => {
        const control = useAnimationControls();

        React.useEffect(() => {
            animateRef?.list.push((delay: number) => {
                control.start(() => ({
                    opacity: 1, marginBottom: '20px',
                    transition: { delay },
                }));
            })
        }, []);

        return (
            <motion.div initial={{ opacity: 0 }} animate={control} {...motionProps}>
                <Typography {...props}>
                    {label}
                    {children}
                </Typography>
            </motion.div>
        )
    }
export default FadeUpTypography;