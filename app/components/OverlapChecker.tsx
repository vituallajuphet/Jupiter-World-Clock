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
    const [openMarket, setOpenMarkets] = useState<string[]>([]);

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
            { market: "Sydney", start: "05:00", end: "14:00", 
                timezone: 'Australia/Sydney'
            }, // Sydney Summer in PHT  
            { market: "Tokyo", start: "07:00", end: "16:00",
                timezone: 'Asia/Tokyo'
             },  // Tokyo all year in PHT
            { market: "London", start: "15:00", end: "00:00",
                timezone: 'Europe/London'
             }, // London Summer in PHT
            { market: "New York", start: "21:00", end: "06:00",
                timezone: 'America/New_York'
             } // New York Summer in PHT
        ] : [
            { market: "Sydney", start: "06:00", end: "15:00",   
                timezone: 'Australia/Sydney'
             }, // Sydney Winter in PHT
            { market: "Tokyo", start: "07:00", end: "16:00",
                timezone: 'Asia/Tokyo'
             },  // Tokyo all year in PHT
            { market: "London", start: "16:00", end: "01:00",
                timezone: 'Europe/London'
             }, // London Winter in PHT
            { market: "New York", start: "22:00", end: "07:00",
                timezone: 'America/New_York'
             } // New York Winter in PHT
        ];

    const overlappingMarkets: string[] = [];
    const openMarkets: string[] = [];

    marketSessions.forEach(({ market, start, end }) => {
        const sessionStart = moment.tz(start, "HH:mm", "Asia/Manila");
        const sessionEnd = moment.tz(end, "HH:mm", "Asia/Manila");

        console.log("sessionStart", market, start, end);

        // Adjust end time to the next day if it is earlier than the start time
        if (sessionEnd.isBefore(sessionStart)) {
            sessionEnd.add(1, 'day');
        }

        // Check if current PHT time falls within the session's hours
        if (currentPHTTime.isBetween(sessionStart, sessionEnd)) {
            openMarkets.push(market);
            overlappingMarkets.push(market);
        }
    });

    setOverlappingMarkets(overlappingMarkets);
    setOpenMarkets(openMarkets); // Store all open markets
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

                {openMarket.length && (
                    <div className="mb-4">
                        <h2 className='mb-2'>Market currently open</h2>
                        {openMarket.map((market, index) => (
                            <div key={index} className=" rounded-md text-xs font-bold mb-2 text-red-400">
                                {market}
                            </div>
                        ))}
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
