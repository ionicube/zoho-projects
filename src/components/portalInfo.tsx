'use client'
import type { Session } from 'next-auth'
import {Avatar, DropdownMenu, Button, Flex, Box, Text, IconButton} from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import { useHotkeys } from 'react-hotkeys-hook'
import {usePortalContext} from "@/utils/usePortal";
import { useEffect} from "react";

export function PortalInfo ({
                              portal,
                              session
                            }: {
  portal: {
    image_url?: string
    name?: string,
    id?: string
  }
  session?: Session
}) {
  const {setPortal} = usePortalContext()
  useEffect(() => {
    if (portal?.id) {
      setPortal(portal.id)
    }
  }, [portal?.id, setPortal])
  const signOutHandler = async () => {
    await signOut()
  }
  useHotkeys('shift+q', signOutHandler)
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton size='3' radius='full'
                    color='indigo'
                    variant='outline'>
          <Avatar
            size="1"
            src={portal?.image_url}
            radius="full"
            fallback="M"
          />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.Item style={{height: 'auto'}}>
          <Box py='2'>
            <Text as="div" size="2" weight="bold">
              {
                portal?.name
              }
            </Text>
            <Text as="div" size="2" color="gray">
              {session?.user?.name}
            </Text>
            <Text as="div" size="1" color="gray">
              {session?.user?.email}
            </Text>
          </Box>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⇧ Q" onClick={signOutHandler}>
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
