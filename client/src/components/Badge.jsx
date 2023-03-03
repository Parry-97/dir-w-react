import React from 'react'
import { Text, VStack } from '@chakra-ui/react'

const Badge = ({ badge }) => {
  return (
    <VStack>
      <img src={`http://localhost:3030/${badge.imageFilePath}`} width={100} alt="" />
      <Text textAlign={"center"}>{badge.name}</Text>
    </VStack>
  )
}

export default Badge
