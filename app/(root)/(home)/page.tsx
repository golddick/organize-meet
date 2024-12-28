import { MeetingTypeList } from '@/components/_component/meetingType/MeetingTypeList';

const Page = () => {

  const now = new Date()

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const date = (new Intl.DateTimeFormat('en-US', {
    dateStyle:'full'
  })).format(now)

  return (
    <section className="flex flex-col size-full gap-6 w-full">
      <div className="h-[300px] w-full rounded-lg bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="text-white glassmorphism max-w-[280px] rounded py-2 text-center text-base font-normal">
            Upcoming meeting at: 5:00 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold/2 lg:text-7xl text-sky-50  uppercase">
              {time}
            </h1>
            <p className="text-lg font-medium text-sky-50 lg:text-2xl">
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  );
};

export default Page;
