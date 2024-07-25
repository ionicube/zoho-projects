'use client'
import {Avatar, Box, Card, Flex, Text} from "@radix-ui/themes";
import {Session} from "next-auth";

export function Tasks({
                            session
                          }: { session: Session }) {
  return (
    <Card size="1" style={{ maxWidth: 320, cursor: 'pointer' }}>
      <Flex gap="3" align="center">
        <Avatar size="3" radius="full" fallback="T" color="indigo" />
        <Box>
          <Text as="div" size="2" weight="bold">
            Tasks export
          </Text>
        </Box>
      </Flex>
    </Card>
  )
}
