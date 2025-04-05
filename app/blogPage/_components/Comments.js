"use client";

import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { Cross, SendIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const Comments = ({ blog, closeComment }) => {
  const {user}=useUser()
  const [Comments, setComment] = useState();
  const [Comment, setComments] = useState();
  async function fetchComments(id) {
    const res = await fetch("/api/comments?blog_id=" + id);
    const data = await res.json();

    setComments(data.documents);

    console.log(Comment);
  }

  async function postComments() {

    const newComment = {
      blog_id: blog.$id,
      name: user?.firstName || "Anonymous",
      comment: Comments,
      email: user?.emailAddresses[0]?.emailAddress || "unknown",
    };

    const response = await fetch("/api/postComments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });

    const data = await response.json();
    
    if (response.ok) {
      setComments([newComment, ...Comment]);
    } else {
      console.error("Error posting comment:", data);
    }
  }

  useEffect(() => {
    if (blog?.$id) fetchComments(blog.$id);
  }, [blog?.$id]);
  
  return (
    <div className="h-auto w-[70vw] shadow-2xl shadow-gray absolute top-20 left-47 rounded-xl z-10 bg-white p-6">
      <div>
        <Cross
          className="rotate-30 cursor-pointer hover:scale-120 transition-all ease-in-out"
          onClick={closeComment}
        />
        <div className="flex justify-center items-center flex-col">
          <div className="flex justify-evenly items-center gap-2">
            <input
              type="text"
              placeholder="Comment On This Blog"
              className="p-3 shadow-xl shadow-gray rounded-2xl border-black border-1 w-2xl"
              onChange={(e)=>{setComment(e.target.value)}}
            />
            <SendIcon className="cursor-pointer text-green-400" onClick={()=>{postComments(blog.$id, user?.firstName, Comments, user?.emailAddresses[0].emailAddress)}}/>
          </div>
          {Comment ? (
            Comment?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="shadow-2xl shadow-gray p-2 rounded-xl mt-3 w-fit"
                >
                  <h3>{item.comment}</h3>
                  <h3 className="text-gray-400">-{item.name}</h3>
                </div>
              );
            })
          ) : (
            <img
              src="/loader.gif"
              alt=""
              height={100}
              width={100}
              className="rounded-4xl mt-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
