'use client'
import React from 'react'
import AnalogClock from './Clock'


function TimeContainer() {
    return (
        <div className='w-full'>

            <div className='flex flex-row items-center gap-4 gap-x-12 w-full justify-center'>
                <AnalogClock
                    timezone="Asia/Manila"
                />
                <AnalogClock
                    timezone="America/New_York"
                />
                <AnalogClock
                    timezone="Australia/Sydney"
                />
                <AnalogClock
                    timezone="Asia/Tokyo"
                />
                <AnalogClock
                    timezone="Europe/London"
                />

            </div>



        </div>
    )
}

export default TimeContainer