'use client'

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const YourBlogs = () => {
  const { user } = useUser(); 
  const [Blogs, setBlogs] = useState([]);
  async function getRes(item) {    
    const response = await fetch('/api/blogCreation', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: item.$id
      })
    });
    fetchBlogs()
  }

  const fetchBlogs = () => {
    if (!user) return;

    fetch(`/api/blogCreation?email=${user.emailAddresses[0].emailAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.documents || []);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
    
    
  };

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  return (
    <div className="h-[210px] w-[60vw] bg-indigo-400 rounded-2xl overflow-y-scroll p-4 mt-2">
      <div className="sticky top-0 z-10 bg-indigo-400 p-2 rounded-xl w-fit">
        <div className="flex gap-4 items-center">
          <Button
            variant={"outline"}
            onClick={fetchBlogs}
            className="bg-white p-2 rounded-lg mb-2 block cursor-pointer sticky top-0 z-10"
          >
            <FontAwesomeIcon icon={faRotate} spin style={{ color: "#000" }} />{" "}
            Refresh
          </Button>
          <h1 className="text-3xl text-white selection:bg-blue-700">|</h1>
          <h1 className="text-3xl text-white selection:bg-blue-700">Your Blogs</h1>
        </div>
      </div>

      <div className="mt-2">
        {Blogs.length > 0 ? (
          Blogs.map((blog) => (
            <div key={blog.$id} className="bg-white p-2 rounded-lg mb-2">
              <p className="text-sm selection:bg-blue-700">{blog?.content}</p>
              <br />
              <h2 className="font-bold">By: {blog?.author}</h2>
              <p>Likes: {blog?.Likes}</p>
              <FontAwesomeIcon icon={faTrash} flip size="lg" style={{color: "#ff0000", cursor: 'pointer'}} onClick={()=>{getRes(blog)}}/>             
               <br />
              </div>
          ))
        ) : (
          <p className="text-white text-center">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default YourBlogs;
