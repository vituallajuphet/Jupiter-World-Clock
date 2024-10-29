'use client';
import React, { useEffect, useState } from 'react';
import { isSummerTime } from './utils';
import moment from 'moment-timezone';

const MarketOverlapChart = () => {
    const [isClient, setIsClient] = useState(false);

    const summerTime = isSummerTime();

    useEffect(() => {
        setIsClient(true);
    }, []);



    // Define each market's hours in PHT directly
    const sessions = [
        {
            market: "Sydney, Australia",
            timezone: "Australia/Sydney",
            start: summerTime ? 5 : 6,
            end: summerTime ? 14 : 15,
            color: 'bg-red-500'
        },   // Sydney: 6 AM - 3 PM (summer), 5 AM - 2 PM (winter)
        {
            market: "Tokyo, Japan",
            timezone: "Asia/Tokyo",
            start: 7,
            end: 16,
            color: 'bg-green-500'
        },      // Tokyo: 8 AM - 5 PM (year-round)
        {
            market: "London, England",
            timezone: "Europe/London",
            start: summerTime ? 15 : 16,
            end: summerTime ? 0 : 1,
            color: 'bg-blue-500'
        },    // London: 3 PM - 12 AM (summer), 4 PM - 1 AM (winter)
        {
            market: "New York, USA",
            timezone: "America/New_York",
            start: summerTime ? 21 : 22,
            end: summerTime ? 6 : 7,
            color: 'bg-yellow-500'
        },    // New York: 8 PM - 5 AM (summer), 9 PM - 6 AM (winter)    // New York: 8 PM - 5 AM PHT
    ];

    const phtHours = Array.from({ length: 24 }, (_, i) => i); // Array [0, 1, ..., 23]

    // Helper function to determine if a cell falls within a market's trading hours
    const isWithinTradingHours = (hour: number, start: number, end: number) => {
        return start < end ? hour >= start && hour < end : hour >= start || hour < end;
    };

    if (!isClient) return null;

    // Helper function to convert 24-hour time to 12-hour format with AM/PM
    const formatTo12Hour = (hour: number) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${adjustedHour} ${period}`;
    };

    return (
        <div className="w-full">
            {/* PHT Header */}
            <div className="flex text-center">
                <div className="w-32 mr-2"></div> {/* Placeholder for market labels */}
                {phtHours.map(hour => {
                    const isCurrentTime = hour === new Date().getHours(); // Current time in PHT
                    return (
                        <div key={hour} className={`font-bold text-xs h-8 p-1 border border-gray-300 w-12 ${isCurrentTime ? 'bg-red-400' : ''}`}>
                            {formatTo12Hour(hour)}
                        </div>
                    );
                })}
            </div>

            {/* Display each market's session */}
            {sessions.map(({ market, start, end, color, timezone }) => (
                <div key={market} className="flex items-center space-x-2">
                    {/* Market Label */}
                    <div className="w-32 text-right font-semibold pr-2 text-xs">{market}</div>
                    {/* Time Slots */}
                    <div className="flex">
                        {phtHours.map(hour => {
                            // const isSameHour = hour === moment().tz(timezone).hour()
                            // console.log("isSameHour", isSameHour)
                            const theColor = isWithinTradingHours(hour, start, end) ? color : 'bg-gray-200'
                            return (
                                <div
                                    key={hour}
                                    className={`h-10 ${theColor} border border-gray-300 w-12 relative flex items-center justify-center`}
                                >
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MarketOverlapChart;
