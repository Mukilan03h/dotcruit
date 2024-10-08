import React, { useState } from 'react';
import axios from 'axios';
import './Resume.css';

const UploadResume = ({ onUpload }) => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [atsScore, setAtsScore] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setJobDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file && jobDescription) {
            onUpload(file);
            // Prepare the form data
            const formData = new FormData();
            formData.append('resume', file);
            formData.append('job_description', jobDescription);

            try {
                const response = await axios.post('https://gemini-api-endpoint.com/parse-resume', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer YOUR_GEMINI_API_KEY',
                    },
                });

                if (response.data && response.data.matching_keywords) {
                    calculateATSScore(response.data.matching_keywords);
                }
            } catch (error) {
                console.error('Error uploading resume:', error);
            }
        }
    };

    const calculateATSScore = (resumeKeywords) => {
        const jobKeywords = jobDescription.toLowerCase().split(' ');

        const matchCount = jobKeywords.filter(keyword => resumeKeywords.includes(keyword)).length;
        const score = (matchCount / jobKeywords.length) * 100;
        setAtsScore(score.toFixed(2));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
            />
            <textarea
                placeholder="Enter the job description here"
                value={jobDescription}
                onChange={handleDescriptionChange}
                rows={6}
                style={{ width: '100%', maxWidth: '400px', padding: '10px', borderRadius: '4px' }}
            />
            <button type="submit">Calculate ATS Score</button>
            {atsScore && <div><h3>ATS Score: {atsScore}%</h3></div>}
        </form>
    );
};

export default UploadResume;
