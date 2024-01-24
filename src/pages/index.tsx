import React from 'react';

const IndexPage: React.FC = () => {
    return (
        <div>
            {/* Top div */}
            <div className="w-screen h-20 bg-blue-500">
                {/* Content of the top div */}
            </div>

            {/* Grid section */}
            <div className="grid grid-cols-3 gap-4">
                {/* Content of the grid section */}
            </div>

            {/* Generic paragraph */}
            <p className="text-gray-700 mt-4">
                A helpful life organizer is a tool that assists individuals in managing their daily tasks, appointments, and goals. It provides a structured approach to organizing various aspects of life, such as work, personal commitments, and health. With features like task lists, reminders, and calendar integration, a life organizer helps individuals stay productive, focused, and balanced. Whether you're a student, professional, or busy parent, a life organizer can be a valuable companion in achieving your goals and maintaining a well-organized life.
            </p>
        </div>
    );
};

export default IndexPage;
