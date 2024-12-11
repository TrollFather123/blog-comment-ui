import { Box, BoxProps, styled } from '@mui/material'
import React from 'react'
import dynamic from 'next/dynamic'


const Header = dynamic(()=> import("../Header/Header"),{ssr:false})


const WrapperStyle = styled(Box)`
    
`

const Wrapper:React.FC<BoxProps> = ({...props}) => {
  return (
    <WrapperStyle {...props}>
        <Header/>
        {props?.children}
    </WrapperStyle>
  )
}

export default Wrapper