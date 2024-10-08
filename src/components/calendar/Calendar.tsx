import React from 'react';
import { Menu, Select, Transition } from '@headlessui/react'
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { ChevronDoubleDownIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import TransitionComponent from '../barber/TransitionComponent';
import SelectBarber from '../barber/SelectBarber';
import { IoIosArrowRoundBack } from "react-icons/io";


const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-10-11T13:00',
    endDatetime: '2022-05-11T14:30',
    hora: "11:00"
  },
  {
    id: 2,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-10-20T09:00',
    endDatetime: '2022-05-20T11:30',
    hora: "15:00"
  },
  {
    id: 3,
    name: 'Dries Vincent',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-10-23T17:00',
    endDatetime: '2022-05-20T18:30',
    hora: "18:00"
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-10-19T13:00',
    endDatetime: '2022-06-09T14:30',
    hora: "14:00"
  },
  {
    id: 5,
    name: 'Michael Foster',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2024-10-01T03:00:00.000Z',
    endDatetime: '2022-05-13T14:30',
    hora: "19:00"
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Calendar() {
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const [selectedHour, setSelectedHour] = useState<string>('')

  const [showNext, setShowNext] = React.useState(false);

  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  )

  const handleReserve = async() => {
    try {
        const dataJson = {
            fecha: firstDayCurrentMonth.toISOString(),
            nombre: "Jose juan",
            hora: selectedHour
        }
        console.log(dataJson)
    } catch (error) {
        console.log(error)
    }
  }



  
  const hours = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2)
    const minutes = i % 2 === 0 ? "00" : "30"; 
    return `${hour}:${minutes}`; 
  }).filter(time => {
    const [hour] = time.split(":").map(Number);
    return hour >= 11 && hour <= 19;
  });



  return (
    <>
    
    <div className="flex  flex-col items-center justify-center">
       <Link to='/' className='h-8 w-8 rounded-md shadow-xl bg-gray-100  absolute top-2 left-5 flex justify-center items-center text-xl font-semibold'> <span className=' '><IoIosArrowRoundBack /></span></Link>
            <TransitionComponent isVisible={!showNext}>
     
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-14">
      

          
                <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900 capitalize">
                {format(firstDayCurrentMonth, 'MMMM yyyy' , {locale: es})}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>D</div>
              <div>L</div>
              <div>M</div>
              <div>X</div>
              <div>J</div>
              <div>V</div>
              <div>S</div>
            </div>
         
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                      <div className="w-1 h-1  rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          
            
          
           
    
          </div>
          <section className="mt-4 flex flex-col justify-between items-center  ">
  <h2 className="font-semibold text-gray-900">
    Seleccionar hora para {' '}
    <time className='capitalize' dateTime={format(selectedDay, 'yyyy-MM-dd', { locale: es })}>
      {format(selectedDay, 'MMM dd, yyy', { locale: es })}
    </time>
  </h2>

          
  <RadioGroup value={selectedHour} onChange={(value) => setSelectedHour(value)} aria-label="Seleccionar hora" > 
     <div className='grid grid-cols-3 place-content-between gap-2 pt-2 '>
  {hours.map((hour) => {
    const isDisabled = meetings.some(
      (meeting) => {
        const meetingDate = format(new Date(meeting.startDatetime), 'yyyy-MM-dd');
        const selectedDate = format(selectedDay, 'yyyy-MM-dd');
        const meetingHour = format(new Date(meeting.startDatetime), 'HH:mm'); 
        
        return meetingDate === selectedDate && meetingHour === hour; 
      }
    );

    return (

      <Field key={hour} className="flex items-center gap-2 border px-3 py-1 rounded-md ">
        <Radio
          value={hour}
          className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
          disabled={isDisabled} 
        >
          <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
        </Radio>
        {isDisabled ?
        <Label className='flex gap-2 line-through text-gray-400'>
      
            {hour}
            
            </Label>
            :
            <Label className='flex gap-2 font-semibold'>{hour} </Label>
            }
      </Field> 
      
    );
  })}
  </div>
</RadioGroup>




</section>

          <section className="mt-5 flex flex-col text-center justify-center gap-2 mb-4 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Jornada{' '}
              <time className='capitalize' dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy', {locale: es})}
              </time>
            </h2>
            <div>


      
    </div>
    {selectedHour ? (
      <button className='px-3 py-1 rounded-md border w-full bg-black  text-white' onClick={() => setShowNext(true)}>Siguiente</button>
  ) : (
    <button className='px-3 py-1 rounded-md border w-full bg-gray-400 mt-2  text-white' disabled>Siguiente</button>
  )}
          
          </section>
        </div>
      </div>
      </TransitionComponent>
  <TransitionComponent isVisible={showNext}>
    <div className=' flex flex-col'>
         <SelectBarber/>
        <button className='bg-black w-64 text-white px-3 py-1 rounded-md ' onClick={() => setShowNext(false)}>Anterior</button>
    </div>
     
      </TransitionComponent>
      
    </div> 

    </>
  )
}

function Meeting({ meeting }) {
  let startDateTime = parseISO(meeting.startDatetime)
  let endDateTime = parseISO(meeting.endDatetime)

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <img
        src={meeting.imageUrl}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
      />
      <div className="flex-auto">
        <p className="text-gray-900">{meeting.name}</p>
        <p className="mt-0.5">
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, 'h:mm a')}
          </time>{' '}
          -{' '}
          <time dateTime={meeting.endDatetime}>
            {format(endDateTime, 'h:mm a')}
          </time>
        </p>
      </div>
      <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >  
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </li>
  )
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]


