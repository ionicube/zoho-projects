'use client'
import {Box, Heading, Flex, Grid, Container} from '@radix-ui/themes'
import {DecorativeBox} from "@/components/decorativeBox";
import {useWindowScroll} from 'react-use'
import React, {useEffect} from "react";
export default function Sticky () {
  const itemsRef = React.useRef(null);
  const {x, y} = useWindowScroll()
  const [delta, setDelta] = React.useState(0);
  useEffect(() => {
    // @ts-ignore
    const itemsRect = itemsRef?.current?.getBoundingClientRect();
    setDelta(itemsRect.bottom <= window.innerHeight ? window.innerHeight - itemsRect.bottom : 0)
  }, [y]);
  const top = '30vh'
  return (
    <>
      <Box style={{
        height: '80vh',
      }}>
        <DecorativeBox></DecorativeBox>
      </Box>
      <Box>
        <Container pb='9'>
          <Flex direction='column' justify='center' style={{
            height: top,
            backgroundColor: 'var(--color-page-background)',
            position: 'sticky',
            zIndex: 1,
            top: `calc(0vh - ${delta}px)`,
          }}>
            <Heading size='9'>Heading</Heading>
          </Flex>
          <Flex gap='3'>
            <Box style={{
              height: `calc(100vh - ${top})`,
              width: '30%',
              position: 'sticky',
              top: `calc(${top} - ${delta}px)`
            }}>
              <DecorativeBox></DecorativeBox>
            </Box>
            <Box grow={'1'}>
              <Box  style={{
                height: '40px',
                marginBottom: '1rem',
                position: 'sticky',
                top: `calc(${top} - ${delta}px)`
              }}>
                <DecorativeBox></DecorativeBox>
              </Box>
              <Grid columns='3' gap='3' ref={itemsRef}>
                {
                  [...Array(30)].map((_, index) => {
                    return (
                      <Box key={index} style={{
                        height: '30vh',
                      }}>
                        <DecorativeBox></DecorativeBox>
                      </Box>
                    )
                  })
                }
              </Grid>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box style={{
        height: '80vh',
      }}>
        <DecorativeBox></DecorativeBox>
      </Box>
    </>
  )
}
