"use client";

import React, { useEffect, useState } from "react";
import BlogPdpStyle from "./PdpPage.module.scss";
import { useParams } from "next/navigation";
import CommentSection from "@/Components/CommentSection/CommentSection";
import Header from "@/Components/Header/Header";

interface NewsArticle {
  source: {
    slug: string | null;
    name: string;
  };
  author: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string;
}

export default function PDPPage() {
  const { slug } = useParams();
  const [blogData, setBlogData] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://newsapi.org/v2/everything?q=tesla&from=2024-07-22&sortBy=publishedAt&apiKey=78a3b82ea5ec484792dac6dd2276da65`;
        const response = await fetch(url);
        const result = await response.json();

        if (result.articles) {
          if (result.articles.find((item: any) => item.source.name === slug)) {
            const blog = result.articles.find(
              (item: any) => item.source.name === slug
            );

            setBlogData(blog);
          } else {
            console.error(
              "Index out of bounds or no blog found with this slug."
            );
          }
        } else {
          console.error("Invalslug API response or slug is undefined.");
        }
      } catch (error) {
        console.error("Error fetching the blog data:", error);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <>
      <div className={BlogPdpStyle.container}>
        <Header onSearch={() => {}} hideSearch />
        {blogData ? (
          <>
            <div className={BlogPdpStyle.container__header}>
              <img
                src={
                  blogData.urlToImage
                    ? blogData.urlToImage
                    : "/Images/auther-01.jpg"
                }
                width={500}
                height={500}
                alt="blog image"
              />

              <div className={BlogPdpStyle.container__header__content}>
                <h1>{blogData.title}</h1>
                <p>{blogData.description}</p>
                <span>
                  Publish Date:{" "}
                  {new Date(blogData.publishedAt).toLocaleDateString()}
                </span>
                <span>Author: {blogData.author}</span>
              </div>
            </div>

            <p>{blogData.content}</p>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Assumenda sequi voluptates sit itaque consequatur explicabo in.
              Illo saepe, magnam ducimus, a magni rem consequuntur quaerat illum
              quos expedita iure impedit, eveniet placeat. Soluta ea, quis velit
              dolorem, impedit officia doloremque iste illo officiis cum
              perferendis ab voluptatibus! Dolores deserunt nesciunt iusto in
              nemo vitae, dolorem assumenda exercitationem animi nobis non
              maxime voluptas commodi sunt officiis sed magnam provident
              excepturi dolore cumque at asperiores deleniti nihil. Voluptates
              tempore modi dolorum officia voluptas distinctio? Numquam deleniti
              dolor inventore nostrum quia fugiat voluptates perferendis
              incidunt labore porro nisi, animi consequatur non eveniet
              doloribus.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur magni ut obcaecati reiciendis itaque in assumenda.
              Debitis soluta rerum eligendi amet aliquam eum nam veritatis totam
              hic enim incidunt error officiis consequuntur voluptas qui nulla,
              consequatur quas. Magni rerum dicta in cupiditate, deleniti vero,
              nisi sunt inventore ratione at excepturi?
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque error quidem adipisci ut itaque vero saepe perferendis
              non corporis cum perspiciatis, amet iusto doloribus natus
              molestiae consequatur aperiam dicta. Assumenda delectus, sapiente
              aut debitis natus facere iure corrupti. In dicta quo laborum culpa
              ipsam tempore distinctio voluptas iste? Eveniet est quod eaque
              fugit totam in dolorem numquam voluptatibus molestiae! Aperiam
              quam quos, numquam, mollitia dolor odio rerum dicta ex distinctio
              harum blanditiis corrupti. Est hic consequatur in provident,
              maiores maxime tempore. Ipsam deserunt eum, facere cupiditate
              doloribus, vitae molestiae totam dolor assumenda modi sit facilis
              dolore ad debitis quasi, rem maiores accusamus praesentium! Minima
              vel doloribus, optio ut, voluptas officiis sunt nesciunt fugit,
              velit impedit corporis at provident non hic! Maiores incidunt
              asperiores ipsa corrupti accusamus? Quae consequatur velit odit,
              natus iusto cupiditate tenetur minus! Voluptates unde voluptatum
              nihil adipisci. Magnam quibusdam hic at fuga dolorem assumenda
              distinctio amet sequi.
            </p>

            {/* Comment Section */}
            <CommentSection />
          </>
        ) : (
          <div className={BlogPdpStyle.loader}>
            <span></span>
          </div>
        )}
      </div>
    </>
  );
}
