import React from 'react';

import Box, { type BoxProps } from '@mui/material/Box';
import { motion, useAnimationControls } from 'framer-motion';

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
  } & BoxProps> = ({
    title,
    description,
    image,
    direction,
    children,
    titleRef,
    descriptionRef,
    ...props
  }) => { 
    return (
      <Box {...props}>
        <Box 
          sx={{
            display: { xs: 'block', md: 'flex' },  
            textAlign: 'left', 
            justifyContent: 'flex-start', 
            flexDirection: direction === 'left' ? 'row' : 'row-reverse',
            marginTop: '30px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100px', maxHeight: '100px' }}>
              {(()=>{
                  const images: string[] = Array.isArray(image) ? image : [image];
                  return images.map((image, i) => 
                      <img key={i} src={`images/langs/${image}.png`} width={`${100/images.length}`} height={`${100/images.length}`} />
                  )
              })()}
          </div>
          <Box sx={{ marginLeft: '20px', marginRight: '20px', width: { xs: '90%', md: '60%' } }}>
              <ProgressiveTypography 
                variant='h3' 
                animateRef={titleRef} 
                label={title} 
                fontWeight='bold' 
                fontSize='min(50px, 7vw)' 
                box={{ sx: { 
                  display: 'flex', 
                  justifyContent: { xs: 'left', md: direction } } 
                }}
              />
              <FadeUpTypography variant='body2' animateRef={descriptionRef}>
                  {description.map<JSX.Element>((str, i) => <span key={i}>{str}<br/></span>)}
              </FadeUpTypography>
          </Box>
        </Box>
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
        <Box sx={{ height: '500px', width: '100%', padding: '5vw' }}>
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