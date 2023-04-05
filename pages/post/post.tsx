import Head from "next/head";
import "slick-carousel/slick/slick.css";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { urlFor ,sanityClient} from "../../sanity";
import { Post } from "../../typings";
import Image from "next/image";
import Link from "next/link";


interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  // console.log(posts);
  return (
    <>
      <Head>
        <title>ScribbleSpot</title>
        <link rel="icon" href="/fevicon.ico" />
      </Head>

      <main className="font-bodyFont">
       
        <Header />
       
        <div className="max-w-7xl mx-auto h-60 relative">
         
        </div>
       
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  md:gap-6 gap-3 py-6 px-4">

          {
            posts.map((post) => (

              <Link key={post._id} href={`/post/${post.slug.current}`} >
                <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                  <div className="relative">
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt="hello"
                      className="w-full h-72 object-cover object-center transition duration-300 ease-in-out transform hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 bg-secondaryColor text-white py-1 px-2 text-sm font-semibold">
                      {post.title}
                    </div>
                  </div>

                  <div className="px-6 py-4">
                    <div className="font-bold text-2xl mb-2">{post.title}</div>
                    <div className="text-gray-700 text-base">{post.description.substring(0, 150)}</div>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200">
                    <div className="flex items-center">
                      <img
                        src={urlFor(post.author.image).url()}
                        alt="AuthorImg"
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div className="text-sm">
                        <div className="text-gray-900 leading-none font-bold"><span>Published by : </span> {post.author.name}</div>
                        {/* <div className="text-gray-600 font-semibold ">Published at : {new Date(post.publishedAt).toLocaleString()}</div> */}
                        <div
                          className="text-gray-600 font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: `Published at: ${new Date(post.publishedAt).toLocaleString()}`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                </div>



              </Link>

            ))
          }

        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </>
  );
}


export const getServerSideProps = async () => {
  const query = `*[_type == 'post'] {
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug,
    publishedAt
    
  
  }`
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    }
  }
}