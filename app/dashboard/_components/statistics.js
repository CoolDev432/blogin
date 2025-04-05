import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const Statistics = () => {
    const { user } = useUser();
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [totalComments, setTotalComments] = useState(0); 

    async function getStats() {
        try {
            if (!user?.emailAddresses?.length) return; 

            const response = await fetch(`/api/stats?email=${user.emailAddresses[0].emailAddress}`);
            const data = await response.json();

            setBlogs(data.docs || []);
            setComments(data.comments || []);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    }

    useEffect(() => {
        if (user) getStats();
    }, [user]);

    useEffect(() => {
        const totalLikes = blogs.reduce((sum, blog) => sum + (blog.Likes || 0), 0);
        setLikes(totalLikes);

        setTotalComments(comments.length)
    }, [blogs, comments]); 

    return (
        <div className="bg-indigo-500 w-[30vw] h-[210px] rounded-2xl p-4">
            <h1 className="text-white font-bold text-3xl">Statistics:</h1>
            <div>
                <h1 className="text-white text-2xl mt-2">Total Likes 🩷: {likes}</h1>
                <h1 className="text-white text-2xl mt-2">Total Comments 💬: {totalComments}</h1>
            </div>
        </div>
    );
};

export default Statistics;
