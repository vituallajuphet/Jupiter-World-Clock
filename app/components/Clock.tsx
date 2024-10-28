'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import ReactCountryFlag from "react-country-flag"

type AnalogClockProps = {
    timezone: string;
};

// Mapping of timezones to flag emojis
const timezoneFlags: { [key: string]: string } = {
    'Asia/Manila': 'PH',
    'America/New_York': 'US',
    'Europe/London': 'GB',
    'Asia/Tokyo': 'JP',
    'Australia/Sydney': 'AU',
    'Europe/Paris': 'FR'
    ,
    // Add more mappings as needed
};

const AnalogClock = ({ timezone }: AnalogClockProps) => {
    const [isClient, setIsClient] = useState(false);
    const [time, setTime] = useState(moment().tz(timezone).toDate());

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const interval = setInterval(() => {
                setTime(moment().tz(timezone).toDate());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isClient, timezone]);

    if (!isClient) return null;

    // Get formatted time values
    const second = parseInt(moment(time).tz(timezone).format('ss'), 10);
    const minute = parseInt(moment(time).tz(timezone).format('mm'), 10);
    const hour = parseInt(moment(time).tz(timezone).format('hh'), 10);

    // Calculate rotation angles
    const secondDegrees = second * 6; // 360deg / 60s
    const minuteDegrees = minute * 6 + second * 0.1; // 360deg / 60min + seconds contribution
    const hourDegrees = ((hour % 12) + minute / 60) * 30; // 360deg / 12hours

    const isMorning = moment(time).tz(timezone).format('A') === 'AM';
    const morningColor = isMorning ? 'bg-white' : 'bg-blue-300';


    return (
        <div>
            <div className={`relative w-52 h-52  border-4 border-black rounded-full flex items-center justify-center ${morningColor}`}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-center font-bold text-gray-800"
                        style={{
                            transform: `rotate(${i * 30}deg) translate(0, -80px) rotate(-${i * 30}deg)`,
                        }}
                    >
                        {i === 0 ? 12 : i}
                    </div>
                ))}

                {/* Hour hand */}
                <div
                    className="absolute bg-black"
                    style={{
                        width: '6px',
                        height: '50px',
                        transformOrigin: 'center bottom',
                        top: '50px',
                        transform: `rotate(${hourDegrees}deg)`,
                    }}
                />

                {/* Minute hand */}
                <div
                    className="absolute bg-black"
                    style={{
                        width: '4px',
                        height: '70px',
                        transformOrigin: 'center bottom',
                        top: '30px',
                        transform: `rotate(${minuteDegrees}deg)`,
                    }}
                />

                {/* Second hand */}
                <div
                    className="absolute bg-red-500"
                    style={{
                        width: '2px',
                        height: '90px',
                        transformOrigin: 'center bottom',
                        top: '10px',
                        transform: `rotate(${secondDegrees}deg)`,
                    }}
                />

                <div className="absolute w-4 h-4 bg-black rounded-full"></div>
            </div>
            <div className='text-center mt-2'>
                <p className='text-xs'>
                    {timezone}
                </p>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <ReactCountryFlag countryCode={timezoneFlags[timezone]} svg className='text-2xl' />
                    <p className="text-center text-lg font-bold">{moment(time).tz(timezone).format('h:mm:ss A')}</p>
                </div>
            </div>
        </div>
    );
};

export default AnalogClock;
