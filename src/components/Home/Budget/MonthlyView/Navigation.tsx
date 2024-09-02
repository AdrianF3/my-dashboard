import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface NavigationProps {
    currentDate: Date;
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
    getMonthYearString: (date: Date) => string;
}

const Navigation: React.FC<NavigationProps> = ({ currentDate, goToPreviousMonth, goToNextMonth, getMonthYearString }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <button onClick={goToPreviousMonth} className="btn btn-secondary">
                <FaChevronLeft />
            </button>
            <h2 className="text-lg font-bold">{getMonthYearString(currentDate)}</h2>
            <button onClick={goToNextMonth} className="btn btn-secondary">
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Navigation;