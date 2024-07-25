'use client'
import constate from 'constate'
import { useState } from 'react'
function usePortal() {
  const [portal, setPortal] = useState<string>('801014726')
  return { portal, setPortal }
}
export const [PortalProvider, usePortalContext] = constate(usePortal)
