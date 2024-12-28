'use client'

import { Loader } from '@/components/_component/Loader'
import { MeetingRoom } from '@/components/_component/meeting/MeetingRoom'
import { MeetingSetup } from '@/components/_component/meeting/MeetingSetup'
import { Alert } from '@/components/ui/alert'
import { useMeetingID } from '@/hooks/use-get-meetingID'
import { useGetCallByID } from '@/hooks/useGetCallByID'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'




export const MeetingPageClient = () => {
 const id = useMeetingID()
  const {call, isCallLoading} = useGetCallByID(id)
  const {user, isLoaded} = useUser()
  const [isSetupComplete, setIsSetupCompleted] = useState(false)

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found 
    </p>
  );

  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting!" />;

if (!isLoaded || isCallLoading ) {
  return <Loader/>
}
  return (
    <main className='h-screen w-full '>
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete? (
          <MeetingSetup setIsSetupCompleted={setIsSetupCompleted}/>
        ): (
          <MeetingRoom/>
        )}
      </StreamTheme>
    </StreamCall>
</main>
  )
}
