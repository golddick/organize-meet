// //@ts-nocheck

// 'use client'

// import { useGetMeeting } from "@/hooks/useGetMeetings"
// import { Call, CallRecording } from "@stream-io/video-react-sdk"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import MeetingListCard from "./MeetingCard"
// import { Loader } from "../Loader"


// interface MeetingListProps {
//     type: 'ended' | 'upcoming' | 'recording'
// }


// export const MeetingList = ({type}:MeetingListProps) => {
//     const router = useRouter()
//     const {endedMeetings, upcomingMeetings, MeetingRecordings, isCallLoading } = useGetMeeting()
//     const [recordings, setRecordings] = useState<CallRecording[]>([])

//     const getMeetings = () => {
//         switch (type) {
//             case 'ended':
//                 return endedMeetings
//             case "recording":
//                 return MeetingRecordings
//             case 'upcoming':
//                 return recordings
//             default:
//                 return[];
//         }
//     }

//     const geNoMeetingsMessage = () => {
//         switch (type) {
//             case 'ended':
//                 return 'No Previous meetings'
//             case "recording":
//                 return 'No Recordings'
//             case 'upcoming':
//                 return 'No Upcoming Meeting'
//             default:
//                 return'';
//         }
//     }

//     const meetings = getMeetings()
//     const noMeetingsMessage = geNoMeetingsMessage()

//     // useEffect(() => {
//     //     // Fetch recordings from multiple meetings when type is 'recording'
//     //     const fetchRecordings = async () => {
//     //         try {
//     //             // Ensure MeetingRecordings is an array of meetings
//     //             const meetingData = await Promise.all(
//     //                 MeetingRecordings.map(async (meeting) => {
//     //                     // Assuming `queryRecordings` is a method that fetches recordings for a single meeting
//     //                     const data = await meeting.queryRecordings()
//     //                     return data // Return data that contains the recordings for each meeting
//     //                 })
//     //             )
                
//     //             // Filter and flatten the recordings array
//     //             const callRecordings = meetingData
//     //                 .filter(meeting => meeting.recordings.length > 0) // Filter meetings that have recordings
//     //                 .flatMap(meeting => meeting.recordings) // Flatten the nested recordings arrays
//     //                 console.log('recordings', recordings)
//     //             setRecordings(callRecordings) // Set the recordings to state
//     //         } catch (error) {
//     //             console.error('Error fetching recordings:', error)
//     //         }
//     //     }

//     //     if (type === 'recording') {
//     //         fetchRecordings()
//     //     }
//     // }, [type, MeetingRecordings])


   
//      useEffect(() => {
//         const fetchRecordings = async () => {
//             try {
//                 // Ensure MeetingRecordings is an array of meetings
//                 const meetingData = await Promise.all(
//                     MeetingRecordings.map(async (meeting) => {
//                         // Assuming `queryRecordings` is a method that fetches recordings for a single meeting
//                         const data = await meeting.queryRecordings()
//                         return data // Return data that contains the recordings for each meeting
//                     })
//                 )

//                 // Filter out meetings that don't have recordings
//                 const callRecordings = meetingData
//                     .filter(meeting => meeting.recordings.length > 0) // Only include meetings with recordings
//                     .flatMap(meeting => meeting.recordings) // Flatten the nested recordings arrays

//                 setRecordings(callRecordings) // Update the recordings state
//             } catch (error) {
//                 console.error('Error fetching recordings:', error)
//             }
//         }

//         if (type === 'recording') {
//             fetchRecordings() // Fetch recordings only if `type` is 'recording'
//         }
//     }, [type, MeetingRecordings]) 
  
    // const formatDate = (date: string | Date | undefined) => {
    //     if (date) {
    //         const parsedDate = new Date(date)
    //         if (!isNaN(parsedDate.getTime())) {
    //             return parsedDate.toLocaleString('en-US', {
    //                 weekday: 'short',
    //                 year: 'numeric',
    //                 month: 'short',
    //                 day: 'numeric',
    //                 hour: 'numeric',
    //                 minute: 'numeric',
    //                 second: 'numeric',
    //                 hour12: true,
    //             })
    //         }
    //     }
    //     return 'N/A' // Fallback if date is invalid
    // }

//     const MeetingLink = `${window.location.origin}/meeting`
    
//     if (isCallLoading) {
//         return <Loader/>
//     }


//   return (
//     <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2">
//         {meetings && meetings.length > 0 ? meetings.map((meeting:Call | CallRecording) => (
//          <MeetingListCard
//             key={(meeting as Call).id}
//             title={(meeting as Call).state?.custom.title}
//             desc={(meeting as Call).state?.custom.description.substring(0,20) || 'No description'}
//             icon={
//                 type === 'ended' ? '/icons/previous.svg':
//                 type === 'upcoming' ? '/icons/upcoming.svg': '/icons/recordings.svg'
//             }
//             date={formatDate((meeting as Call).state.startsAt) || formatDate(meeting.start_time)}
//             isPreviousMeeting={type === 'ended'}
//             buttonIcon1={type === 'recording' ? '/icons/play.svg' : undefined}
//             buttonText={type === 'recording' ? 'Play' : 'Start'}
//             handleClick={type === 'recording' ? () =>
//         router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting.id}`)
//         }
//             link={type === 'recording' ? meeting.url : `${MeetingLink}/${meeting.id}`}
//          />
//         )): (
//             <h1>{noMeetingsMessage}</h1>
//         )}
//     </div>
//   )
// }

//@ts-nocheck

'use client';

import { Call, CallRecording } from '@stream-io/video-react-sdk';


import MeetingCard from './MeetingCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMeeting } from '@/hooks/useGetMeetings';
import { Loader } from '../Loader';
import { useToast } from '@/hooks/use-toast';

const MeetingList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const router = useRouter();
  const toast = useToast()
  const { endedCalls, upcomingCalls, callRecordings, isCallLoading } =
    useGetMeeting();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  const formatDate = (date: string | Date | undefined) => {
    // Handle invalid date
    if (!date) return 'N/A';

    const parsedDate = new Date(date); // Parsing the ISO date string

    if (isNaN(parsedDate.getTime())) return 'N/A'; // Fallback if parsing fails

    // Format date using toLocaleString for a more readable format
    return parsedDate.toLocaleString('en-US', {
        weekday: 'short',   
        year: 'numeric',    
        month: 'short',   
        day: 'numeric',   
        hour: 'numeric',  
        minute: 'numeric',  
        second: 'numeric',  
        hour12: true,     
    });
};



  useEffect(() => {
    const fetchRecordings = async () => {
        try {
            
            const callData = await Promise.all(
                callRecordings?.map((meeting) => meeting.queryRecordings()) ?? [],
              );
        
              const recordings = callData
                .filter((call) => call.recordings.length > 0)
                .flatMap((call) => call.recordings);
        
              setRecordings(recordings);
        } catch (error) {
            toast({title: 'Try again later'})
            console.log(error)
        }
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isCallLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  const MeetingLink = `${window.location.origin}`

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                  ? '/icons/upcoming.svg'
                  : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.title ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              'No Title'
            }
            // desc={
            //   (meeting as Call).state?.custom?.description ||
            //   (meeting as CallRecording).filename?.substring(0, 20) ||
            //   'No Description'
            // }
            desc={type === 'recordings' ? '' : (meeting as Call).state?.custom?.description  }
            // date={
            //   (meeting as Call).state?.startsAt?.toLocaleString() ||
            //   (meeting as CallRecording).start_time?.toLocaleString()
            date={type ==='recordings' ? (meeting as CallRecording).start_time?.toLocaleString() : formatDate((meeting as Call).state?.startsAt) }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (meeting as CallRecording).url
                : `${MeetingLink}/meeting/${(meeting as Call).id}`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default MeetingList;

