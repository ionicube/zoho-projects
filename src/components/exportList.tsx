import {Avatar, DropdownMenu, Box, Flex, Card, Text, IconButton} from "@radix-ui/themes";
import {Session} from "next-auth";
import {TimeSheet} from "@/components/timeSheet";
import {Tasks} from "@/components/tasks";
export function ExportList ({
                              session
                            }: { session: Session }) {
  return (
    <Flex gap='4' mt='2'>
      <TimeSheet session={session}></TimeSheet>
      {/*<Tasks session={session}></Tasks>*/}
    </Flex>
  )
}
