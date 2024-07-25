import { auth }  from '@/auth'
import {Box, Container, Flex} from '@radix-ui/themes'
import { SignIn } from '@/components/signIn'
import {Portals} from "@/components/portals";
import {ExportList} from "@/components/exportList";
import {PortalProvider} from "@/utils/usePortal";

export default async function Home() {
  const session = await auth()
  return (
    <PortalProvider>
      <Container>
        {
          (!session?.user || !session?.accessToken) ? <SignIn /> : (
            <Box p='4'>
              <Flex align='center' justify='end'>
                <Portals session={session}></Portals>
              </Flex>
              <ExportList session={session}></ExportList>
            </Box>
          )
        }
      </Container>
    </PortalProvider>

  )
}
