import React from 'react';

import Box, { type BoxProps } from '@mui/material/Box';
import { motion, type MotionProps, useAnimationControls } from 'framer-motion';

import { type listAnimatonRefType } from 'src/@type';
import ProgressiveTypography from 'src/components/ProgressiveTypography';
import FadeUpTypography from 'src/components/FadeUpTypography';

import listData from './listData.json';
 
const ListItem: React.FC<{
    title: string,
    description: string[],
    image: string | string[],
    direction: 'left' | 'right',
    children?: JSX.Element,
    titleRef?: listAnimatonRefType | undefined,
    descriptionRef?: listAnimatonRefType | undefined,
  } & BoxProps & { motion?: MotionProps | undefined }> = ({
    title,
    description,
    image,
    direction,
    children,
    titleRef,
    descriptionRef,
    motion: motionProps,
    ...props
  }) => {
    return (
      <Box {...props}>
        <div style={{ 
          display: 'flex', 
          textAlign: 'left', 
          justifyContent: 'flex-start', 
          flexDirection: direction === 'left' ? 'row' : 'row-reverse'
        }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100px', height: '100px' }}>
                {(()=>{
                    const images: string[] = Array.isArray(image) ? image : [image];
                    return images.map(image => 
                        <img src={`images/langs/${image}.png`} width={`${100/images.length}`} height={`${100/images.length}`} />
                    )
                })()}
            </div>
          <div style={{ marginLeft: '20px', marginRight: '20px', width: '60%' }}>
            <ProgressiveTypography variant='h3' animateRef={titleRef} label={title} align={direction} sx={{ fontWeight: 'bold', textAlign: direction }} motion={motionProps}/>
            <FadeUpTypography variant='body2' animateRef={descriptionRef}>
                {description.map<JSX.Element>(str => <>{str}<br/></>)}
            </FadeUpTypography>
          </div>
        </div>
        {children}
      </Box>
    )
  }
  
  const ListSection: React.FC = () => {
    const listAnimateControl = useAnimationControls();
  
    const titleRef: listAnimatonRefType = { list: [] };
    const descriptionRef: listAnimatonRefType = { list: [] };

    React.useEffect(() => {
        setTimeout(()=>{
            listAnimateControl.start((i: number) => {
                titleRef.list[i]?.call(null, 1 + i);
                descriptionRef.list[i]?.call(null, 1.5 + i);
                
                return {
                    opacity: 1, 
                    marginBottom: '20px',
                    transition: { delay: 1 + i }
                }
            });
        }, 1000);
    }, []);
  
    return (
        <Box sx={{ height: '500px', width: '100%', padding: '100px' }}>
            {listData.map(({ title, description, image}, i) => (
                <motion.div
                key={i}
                custom={i}
                initial={{ opacity: 0 }}
                animate={listAnimateControl}
                style={{ marginTop: 2 }}
                >
                    <ListItem 
                        {...{title, description, image, titleRef, descriptionRef }}
                        direction={i % 2 == 0 ? 'left' : 'right'} 
                    />
                </motion.div>
            ))}
        </Box>
    )
}

export default ListSection;