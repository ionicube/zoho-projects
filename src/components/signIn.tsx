'use client'
import { signIn } from "next-auth/react";
import { EnterIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { Flex } from '@radix-ui/themes'

export function SignIn () {
  return (
    <Flex align='center' justify='center' style={{
      minHeight: '100vh'
    }}>
      <Button onClick={async () => {
        await signIn('zoho')
      }}>
        <EnterIcon></EnterIcon> Sign in with zoho project
      </Button>
    </Flex>
  )
}
