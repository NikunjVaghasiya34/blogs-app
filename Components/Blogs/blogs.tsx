"use client";

import BlogStyle from "./blog.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Pagination from "../Pagination/Pagination";
import Link from "next/link";
import data from "../../Components/TestData.json";

export default function Blog({ searchQuery = "" }) {
  const { name } = useParams();
  const [newsData, setNewsData] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const blogsPerPage = 10;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-22&sortBy=publishedAt&apiKey=78a3b82ea5ec484792dac6dd2276da65`;
  //       const response = await fetch(url);
  //       const result = await response.json();

  //       // setTotalRecord(result.totalResults);
  //       setTotalRecord(100);
  //       setNewsData(result.articles);
  //     } catch (error) {
  //       console.error("Error fetching the news:", error);
  //     }
  //   };

  //   fetchData();
  // }, [name]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const result = data;
        setTotalRecord(result.articles.length);
        setNewsData(result.articles);
      } catch (error) {
        console.error("Error fetching the news:", error);
      }
    };

    fetchData();
  }, [name]);

  // Filter blogs based on searchQuery
  const filteredBlogs = newsData.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBlog = pageNo * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const onPageChange = (page: any) => {
    setPageNo(page);
  };

  return (
    <>
      {currentBlogs.length > 0 ? (
        <>
          <div className={BlogStyle.container}>
            {currentBlogs.map((item, index) => {
              const blogUrl = `/blog/${encodeURIComponent(item.source.name)}`;
              return (
                <Link key={index} href={blogUrl}>
                  <div className={BlogStyle.container__blogs}>
                    <img
                      src={
                        item.urlToImage
                          ? item.urlToImage
                          : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png"
                      }
                      alt="news"
                      width={300}
                      height={200}
                    />
                    <div>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <div>
                        <span>
                          Published At:{" "}
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <Pagination
            pageNo={pageNo}
            totalRecord={filteredBlogs.length}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className={BlogStyle.loader}>
          <span></span>
        </div>
      )}
    </>
  );
}
