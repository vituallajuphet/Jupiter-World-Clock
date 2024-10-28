'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { isSummerTime } from './utils';

type MarketOverlapProps = {
    timezone?: string;
};

const MarketOverlapChecker = ({ }: MarketOverlapProps) => {
    const [isClient, setIsClient] = useState(false);

    const [overlappingMarkets, setOverlappingMarkets] = useState<string[]>([]);

    const summerTime = isSummerTime();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            const interval = setInterval(() => {
                checkMarketOverlaps();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isClient]);

    const checkMarketOverlaps = () => {
        const currentPHTTime = moment().tz("Asia/Manila");

        // Define market session times in Philippine Time (GMT+8)   
        const marketSessions = summerTime ? [
            { market: "Sydney", start: "02:00", end: "11:00" }, // Sydney Summer in PHT
            { market: "Tokyo", start: "07:00", end: "16:00" },  // Tokyo all year in PHT
            { market: "London", start: "23:00", end: "07:00" }, // London Summer in PHT
            { market: "New York", start: "21:00", end: "06:00" } // New York Summer in PHT
        ] : [
            { market: "Sydney", start: "03:00", end: "12:00" }, // Sydney Winter in PHT
            { market: "Tokyo", start: "07:00", end: "16:00" },  // Tokyo all year in PHT
            { market: "London", start: "00:00", end: "08:00" }, // London Winter in PHT
            { market: "New York", start: "23:00", end: "08:00" } // New York Winter in PHT
        ];

        const overlaps: string[] = [];

        marketSessions.forEach(({ market, start, end }) => {
            const sessionStart = moment.tz(start, "HH:mm", "Asia/Manila");
            const sessionEnd = moment.tz(end, "HH:mm", "Asia/Manila");

            // Adjust end time to the next day if it is earlier than the start time
            if (sessionEnd.isBefore(sessionStart)) {
                sessionEnd.add(1, 'day');
            }

            // Check if current PHT time falls within the session's hours
            if (currentPHTTime.isBetween(sessionStart, sessionEnd)) {
                overlaps.push(market);
            }
        });

        setOverlappingMarkets(overlaps);
    };

    return (
        <div className="my-8 mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Overlap Checker</h2>
            <div>
                {overlappingMarkets.length > 1 && (
                    <div className="mb-4">
                        <h2 className='mb-2'>Overlapping Markets:</h2>
                        {overlappingMarkets.map((market, index) => (
                            <div key={index} className=" rounded-md text-xs font-bold mb-2 text-red-400">
                                {market}
                            </div>
                        ))}
                    </div>
                )}

                {overlappingMarkets.length === 1 && (
                    <div className="mb-4">
                        <h2 className='mb-2'>Market currently open</h2>
                        <div className=" rounded-md text-xs font-bold mb-2 text-red-400">
                            {overlappingMarkets[0]}
                        </div>
                    </div>
                )}


                {overlappingMarkets.length === 0 && (
                    <div className="mb-4">
                        <h2 className='mb-2'>No markets are currently open</h2>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MarketOverlapChecker;
