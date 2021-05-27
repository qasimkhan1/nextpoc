import Head from "next/head";
import React from "react";
import { connect } from "react-redux";

// export default class Home extends React.Component {
//     static async getInitialProps() {
//         let photo = null;
//         await fetch('https://jsonplaceholder.typicode.com/photos/1')
//             .then((response) => response.json())
//             .then((json) => {
//                 photo = json;
//             });

//         return {
//             photo,
//         };
//     }
//     render() {
//         const { photo } = this.props;
//         console.log('this.props', this.props);
//         return (
//             <div>
//                 <Head>
//                     <title>Social Media Preview</title>
//                     <meta property="og:url" content="Bazaarghar.com" />
//                     <meta property="og:type" content="website" />
//                     <meta property="fb:app_id" content="your fb id" />
//                     <meta property="og:title" content={photo?.title} />
//                     <meta name="twitter:card" content="summary" />
//                     <meta
//                         property="og:description"
//                         content="Hurray!! Yes Social Media Preview is Working"
//                     />
//                     <meta
//                         property="og:image"
//                         content={
//                             'https://www.whatsappimages.in/wp-content/uploads/2020/11/Boys-Free-Feeling-Sad-Pics-Images-Download.jpg'
//                         }
//                     />
//                 </Head>
//                 <h2>{photo?.title} v0.4</h2>
//             </div>
//         );
//     }
// }
// function Blog({ response }) {
//     console.log('postsss in blog', response);
//     return (
//         <ul>
//             abcd
//             {/* {posts.map((post) => (
//                 <li>{post.title}</li>
//             ))} */}
//         </ul>
//     );
// }

// export async function getStaticPaths() {
//     const response = await Repository.get(`${baseUrl}/products/getAllProducts`)
//         .then((response) => {
//             return response.data;
//         })
//         .catch((error) => ({ error: JSON.stringify(error) }));

//     let paths = [
//         {
//             params: { id: '60632ec44252192acf441ea9' },
//         },
//     ];

//     console.log('response', response);
//     console.log('paths', paths);

//     return {
//         paths,
//         fallback: true,
//     };
// }
// export async function getStaticProps({ params }) {
//     console.log('resulttttttt====', params);

//     const response = await Repository.get(
//         `${baseUrl}/products/${params.id}`
//     ).then((response) => {
//         return response.data;
//     });
//     console.log('resulttttttt====', response);

//     return {
//         props: {
//             response: response,
//         },
//     };
// }
// export default Blog;
class Post extends React.Component {
  // Render post...
  render() {
    console.log("this.props", this.props);

    const { post } = this.props;
    return (
      <div>
        <Head>
          <title>{post.title}</title>

          <meta property="og:image" content={post.thumbnailUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.title} />
          <meta
            property="og:url"
            content={"https://main--pensive-bose-e5a231.netlify.app/"}
          ></meta>

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={post.title} />
          <meta
            property="twitter:url"
            content={"https://main--pensive-bose-e5a231.netlify.app/"}
          ></meta>
          <meta property="twitter:description" content={post.title} />
          <meta property="twitter:image" content={post.thumbnailUrl} />
          <meta name="title" property="og:title" content={post.title} />
        </Head>
        <ul>
          <li>{this.props.post.title}</li>
          {/* {posts.map((post) => (
                        <li>{post.title}</li>
                    ))} */}
        </ul>
        <img
          src={this.props.post.thumbnailUrl}
          alt="chat avatar"
          height="400"
          width="400"
        />
      </div>
    );
  }
}

export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const posts = await res.json();

  const result = posts.map((post) => ({
    params: { id: JSON.stringify(post.id) },
  }));

  let paths = [...result];

  console.log("paths", paths);

  return { paths, fallback: false };
};

// This also gets called at build time
export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${params.id}`
  );
  const post = await res.json();

  console.log("postss======", post);

  return { props: { post } };
};

export default connect((state) => state)(Post);
