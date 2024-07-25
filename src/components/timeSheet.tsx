'use client'
import {Avatar, Box, Card, Flex, Text, Button} from "@radix-ui/themes";
import {Session} from "next-auth";
import {usePortalContext} from "@/utils/usePortal";
import {timeSheetAction} from "@/app/actions";
import { useFormStatus } from "react-dom";
import {signOut} from "next-auth/react";

function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button variant='ghost' type='submit' disabled={pending}>
      <Flex gap="3" align="center">
        <Avatar size="3" radius="full" fallback="T" color="indigo" />
        <Box>
          <Text as="div" size="2" weight="bold">
            Timesheet and tasks export
          </Text>
        </Box>
      </Flex>
    </Button>
  )
}
export function TimeSheet({
                            session
                          }: { session: Session }) {
  const accessToken = session.accessToken as string
  const {portal} = usePortalContext()


  return (
    <Card size="1" style={{ maxWidth: 320, cursor: 'pointer' }}>
      <form action={async () => {
        const action = timeSheetAction.bind(null, accessToken, portal)
        try {
          await action()
        } catch (e) {
          // @ts-ignore
          if (e?.message === '6401') {
            await signOut()
          }
        }
      }}>
        <Submit></Submit>
      </form>
    </Card>
  )
}

