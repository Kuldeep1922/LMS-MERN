import React from 'react'
import Course from './Cource'

const MyLearning = () => {
    let isloading = false;
    let mylearningcources = [];
    return (
        <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
            <h1 className="font-bold text-2xl">MY LEARNING</h1>
            <div className="my-5">
                {isloading ? (
                    <MyLearningSkeleton />
                ) : mylearningcources.length === 0 ? (
                    <p>You are not enrolled in any course.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {[1, 2, 2, 3,].map((cource, index) => <Course key={index} course={cource}/>)}

                    </div>
                )}
            </div>
        </div>
    );
};


export default MyLearning



// Skeleton component for loading state
const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
            <div
                key={index}
                className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
            ></div>
        ))}
    </div>
);
