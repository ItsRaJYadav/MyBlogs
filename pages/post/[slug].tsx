import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from "react-hook-form";
import comment from '../../scribblespot/schemas/comment'
import { useSession } from 'next-auth/react'
import Image from 'next/image';


interface Props {
  post: Post
}
interface Post {
  _id: string;
  publishedAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  description: string;
  mainImage: string;
  slug: {
    current: string;
  };
  body: string;
}

type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Post = ({ post }: Props) => {
  const { data: session } = useSession();


  const [submitted, setSubmitted] = useState(false);
  const [userErr, setUserErr] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {

    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => {
      setSubmitted(true);
      reset();
    })
      .catch((err) => {
        setSubmitted(false);
      });
    // console.log(data);
  };
  const handleError = () => {
    if (!session) {
      setUserErr("Please sign in to comment.");
      setTimeout(() => {
        setUserErr("");
      }, 3000); // 3 seconds
    } else {
      setUserErr("");
    }
  };
  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 3000); // 3 seconds
    }
  }, [submitted]);

  return (
    <>
      <Header />

      {/* banner image */}
      <div className='mt-30'>
        
        <img
          className='w-full h-96 object-cover object-top'
          src={urlFor(post.mainImage).url()!}
          alt="imageofmain"
          style={{ backgroundPosition: 'top center' }}
        />

       

        {/* main body */}
        <div className='max-w-6xl mx-auto'>
          <div className='w-full mx-auto p-5 bg-secondaryColor/10  ' >
            <h1 className='font-titleFont font-medium text-[32px] text-primary border-b-[1px] border-b-cyan-800 mt-10 mb-3 ' >{post.title}</h1>
            <h2 className='font-bodyFont text-[18px] test-gray-500 mb-3 '>{post.description} </h2>



            {/* author section */}
            <div className='flex items-center gap-2 '>
              <img
                className='rounded-full w-12 h-12 object-cover'
                src={urlFor(post.author.image).url()!} alt="authorImage" width={12}
                height={12} />

              <div className='font bodyFont text-base' > Blog post by: <span className="text-secondaryColor font-bold">{post.author.name}</span>
                - Published At {new Date(post.publishedAt).toLocaleDateString()}  </div>
            </div>

          </div>



          <div className='mt-10'>
            <PortableText
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET }
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID }
              content={post.body}
              serializers={{
                h1: (props: any) => {
                  return <h1 className='text-3xl font-bold font titleFont my-5 ' {...props} />;
                },
                h2: (props: any) => {
                  return <h2 className='text-2xl font-bold font titleFont my-5  ' {...props} />;
                },
                h3: (props: any) => {
                  return <h3 className='text-2xl font-bold font titleFont my-5 mb-3 ' {...props} />;
                },
                li: ({ children }: any) => {
                  return <li className='ml-4 list-disc'>{children}</li>;
                },
                link: ({ href, children }: any) => {
                  return (
                    <a href={href} className='text-cyan-500 hover:underline'>
                      {children}
                    </a>
                  );
                },
              }}
            />
          </div>
        </div>

        {/* comments */}
        <hr className='max-w-full my-5 mx-auto border[1px] border-secondaryColor ' />
        {
          submitted ? <div className="p-4 bg-green-100 border-green-400 border rounded">
            <h1 className="text-green-800 font-bold mb-2">Thank you for submitting your comment!</h1>
            <p className="text-green-700">Once your comment is approved by an admin, it will show up here.</p>
          </div>
            : <div>
              <h1 className='text-secondaryColor text-xs font-titleFont font-bold ' >Have you enjoyed? </h1>
              <h3 className='text-titleFont text-3xl font-bold ' >Leave a comments</h3>
              <hr className='py-3 mt-3' />
              {/* form */}
              <div className="max-w-lg mx-auto">
                <input {...register("_id")}
                  type='hidden'
                  name='id'
                  value={post._id} />

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                      Name:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="enter your name"
                    />
                    {errors.name && (
                      <div className='text-bold ml-2' style={{ color: 'red', fontSize: '14px' }}>Please fill name section</div>
                    )}

                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                      Email:
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("email", { required: true })}
                      type="text"
                      placeholder="enter your email"
                    />
                    {errors.email && (
                      <div className='text-bold ml-2' style={{ color: 'red', fontSize: '14px' }}>Please fill email address</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
                      Message:
                    </label>
                    <textarea
                      {...register("comment", { required: true })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 "
                      placeholder='Enter message here'
                    ></textarea>
                    {errors.comment && (
                      <div className='text-bold ml-2' style={{ color: 'red', fontSize: '14px' }}>Please write some Comments </div>
                    )}

                  </div>
                  <div className="flex items-center justify-between">
                    {
                      session && (<button className="bg-green-500 hover:bg-secondaryColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                        Submit
                      </button>
                      )}
                  </div>
                </form>
                {
                  !session && (<button onClick={handleError} className="bg-red-500 hover:bg-secondaryColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" >
                    Submit
                  </button>
                  )}

                {
                  userErr && (
                    <div className="text-center bg-white-100 border border-red-500 text-gray-900 px-4 py-2 rounded relative mt-2" role="alert">
                      <span className="block sm:inline animate-pulse">{userErr}</span>
                    </div>
                  )
                }



                {/* commented out below */}
                <hr />
                <div className='w-full flex flex-col p-10 mx-auto my-10 shadow-bgColor shadow-lg space-y-2 '>
                  <h3 className='text-3xl font-titleFont font-bold '>Comments</h3> <hr />
                  {/* {
                post.comments.map((comment)=>{
                  <div><div>{comment.comment}</div></div>
                })
              } */}
                </div>
              </div>
            </div>
        }

      </div>



      <div className='py-20'></div>
      <Footer />
    </>
  )
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == 'post'] {
    _id,
    slug{
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0] {
    _id,
    publishedAt,
    title,
    author -> {
      name,
      image
    },
    "comments":*[_type == 'comment' && post._ref == ^._id && approved==true],
    description,
    mainImage,
    slug,
    body,
    
  }`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
