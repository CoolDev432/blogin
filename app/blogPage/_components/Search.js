"use client";

import React, { useState, useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@clerk/nextjs";
import Comments from "./Comments";

const Search = () => {
  const { user } = useUser();
  const [DefSearchParam, setDefSearchParam] = useState("author"); 
  const [Search, setSearch] = useState("");
  const [Blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const search = useRef();


  useEffect(() => {
    loadBlogs();
  }, []);

  function closeComment() {
    setSelectedBlog(null);
  }

  async function loadBlogs() {
    try {
      console.log("Fetching blogs...");
      const res = await fetch("/api/getBlog");
      console.log("Response status:", res.status);
  
      if (!res.ok) throw new Error("Failed to load blogs");
  
      const data = await res.json();
      console.log("Fetched data:", data);  
  
      setBlogs(data || []);
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  }
  
  async function handleLike(item) {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const res = await fetch(
        `/api/handleLikes/?email=${
          user.emailAddresses[0]?.emailAddress
        }&blog_id=${item.$id}&title=${encodeURIComponent(
          item.title
        )}&content=${encodeURIComponent(
          item.content
        )}&author=${encodeURIComponent(item.author)}`
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      if (data.alreadyLiked) {
        alert("Already Liked");
        return;
      }

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.$id === item.$id
            ? { ...blog, Likes: (blog.Likes || 0) + 1 }
            : blog
        )
      );
    } catch (err) {
      console.error("Error in handleLike:", err);
    }
  }

  async function handleSearch() {
    if (!Search) {
      loadBlogs(); 
      return;
    }

    try {
      const res = await fetch(
        `/api/searchBlog?param=${DefSearchParam}&searchedText=${Search}`
      );

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();

      if (data.message === "No Documents Found!") {
        alert("No Blog Found!");
        setBlogs([]); // Clear current blogs if none found
        return;
      }

      setBlogs(data.documents || []);
      console.log(data);
    } catch (error) {
      console.error("Error in handleSearch:", error);
    }
  }

  return (
    <div className="h-fit">
      <div className="flex justify-center items-center gap-2 flex-wrap lg:mt-8">
        <h1>Search By:</h1>
        <Button
          onClick={() => setDefSearchParam("author")}
          className={
            DefSearchParam === "author"
              ? "border-2 border-purple-600 cursor-pointer"
              : "border-none cursor-pointer"
          }
        >
          Author
        </Button>
        <Button
          onClick={() => setDefSearchParam("title")}
          className={
            DefSearchParam === "title"
              ? "border-2 border-purple-600 cursor-pointer"
              : "border-none cursor-pointer"
          }
        >
          Title
        </Button>
        <h1 className="text-3xl">|</h1>
        <div className="flex items-center gap-2 bg-neutral-100 rounded-3xl">
          <input
            type="text"
            className="bg-neutral-100 p-3 rounded-2xl border-neutral-100"
            placeholder="Search For A Blog!"
            ref={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === "") loadBlogs(); // Load all blogs if input is cleared
            }}
          />
          <Button variant={"ghost"} onClick={handleSearch} className={"cursor-pointer"}>
            <SearchIcon />
          </Button>
        </div>
      </div>

      <hr className="mt-3" />

      <div className="h-auto mt-7 flex justify-center flex-col">
        {Blogs.length > 0 ? (
          Blogs.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-gray-200 shadow-xl mt-5 p-6 rounded-2xl w-[70vw]"
            >
              <h1 className="font-bold text-3xl">{item.title}</h1>
              <p>
                {item.content.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <h2>Author: {item.author}</h2>

              <div className="flex w-[300px] justify-evenly items-center mt-2 p-3 rounded-4xl bg-gray-200">
                <h1
                  className="scale-150 cursor-pointer flex items-center gap-1 justify-evenly"
                  onClick={() => handleLike(item)}
                >
                  👍 <span className="text-[10px]">{item.Likes}</span>
                </h1>
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ color: "black", cursor: "pointer" }}
                  className="scale-150"
                  onClick={() => setSelectedBlog(item)}
                />
              </div>
            </div>
          ))
        ) : (
          <h1>No Blogs Found!</h1>
        )}
      </div>

      {selectedBlog && (
        <Comments blog={selectedBlog} closeComment={closeComment} />
      )}
    </div>
  );
};

export default Search;
