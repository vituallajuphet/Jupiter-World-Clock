export const isSummerTime = () => {
    const now = new Date();
    const month = now.getUTCMonth();
    const date = now.getUTCDate();

    // DST generally starts on the second Sunday in March and ends on the first Sunday in November in the U.S.
    // In the EU, it starts on the last Sunday in March and ends on the last Sunday in October.
    // This function uses these dates as approximations.

    // U.S. DST start: second Sunday in March
    if (month === 2) { // March
        const secondSunday = 8 + (7 - new Date(now.getFullYear(), 2, 1).getUTCDay()) % 7;
        return date >= secondSunday;
    }
    // U.S. DST end: first Sunday in November
    if (month === 10) { // November
        const firstSunday = 1 + (7 - new Date(now.getFullYear(), 10, 1).getUTCDay()) % 7;
        return date < firstSunday;
    }
    // Approximate DST period (March to October)
    return month > 2 && month < 10;
};

