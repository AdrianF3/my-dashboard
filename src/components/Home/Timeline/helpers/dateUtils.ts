// helpers/dateUtils.ts

export const calculateDatePosition = (date: Date, startDate: Date, endDate: Date) => {
    const totalDuration = endDate.getTime() - startDate.getTime();
    const dateOffset = date.getTime() - startDate.getTime();
    return (dateOffset / totalDuration) * 100;
};

export const generateDates = (startDate: Date, endDate: Date, timescale: 'Days' | 'Months' | 'Years') => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        if (timescale === 'Days') {
            currentDate.setDate(currentDate.getDate() + 1);
        } else if (timescale === 'Months') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else if (timescale === 'Years') {
            currentDate.setFullYear(currentDate.getFullYear() + 1);
        }
    }

    return dates;
};
