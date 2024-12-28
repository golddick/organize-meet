import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import React, { useEffect, useState } from 'react'

export const useGetMeeting = () => {
const [call, setCall] = useState<Call[]>([])
const client = useStreamVideoClient()
const [isCallLoading, setIsCallLoading] = useState(false)
const {user } = useUser()

useEffect(() => {
    
    const loadMeetings = async () => {
    if(!client || !user?.id) return
    setIsCallLoading(true)

    try {

        const { calls } = await client.queryCalls({
           sort:[{field:'starts_at', direction:-1}],
           filter_conditions:{
            'starts_at':{$exists: true},
            $or:[
                {created_by_user_id: user.id},
                {members: {$in:[user.id]}}
            ]
           }
          });
        setCall(calls)
    } catch (error) {
        console.log(error)
    } finally{
        setIsCallLoading(false)
    }
}

loadMeetings()
}, [client, user?.id])

const now = new Date()

const endedCalls = call.filter(({state: {startsAt, endedAt}}: Call) => {
    return ( startsAt && new Date(startsAt) < now || !!endedAt )
})
const upcomingCalls = call.filter(({state: {startsAt, endedAt}}: Call) => {
    return ( startsAt && new Date(startsAt) >= now && !endedAt )
})




return {endedCalls,upcomingCalls,callRecordings:call ,isCallLoading}
}
