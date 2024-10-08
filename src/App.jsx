import React, { useState } from 'react';
import Resume from './Components/Resume';
import Result from './Components/Result';

const App = () => {
    const [score, setScore] = useState(null);

    const handleResumeUpload = async (file) => {
        // Simulate ATS score calculation
        const simulatedScore = Math.floor(Math.random() * 100);
        setScore(simulatedScore);
    };

    return (
        <div>
            <h1>ATS Score Checker</h1>
            <Resume onUpload={handleResumeUpload} />
            {score !== null && <Result score={score} />}
        </div>
    );
};

export default App;
