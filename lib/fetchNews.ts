import { gql } from 'graphql-request'
import sortNewsByImage from './sortNewsByImage'

const fetchNews = async (
    category?: Category | string,
    keywords?: string,
    isDynamic?: boolean
) => {
    const query = gql`
        query MyQuery(
            $access_key: String!
            $categories: String!
            $keywords: String
        ) {
            myQuery(
                access_key: $access_key
                categories: $categories
                countries: "us"
                sort: "published_desc"
                keywords: $keywords
            ) {
                data {
                    author
                    category
                    image
                    description
                    country
                    language
                    published_at
                    source
                    title
                    url
                }
                pagination {
                    count
                    limit
                    offset
                    total
                }
            }
        }
    `

    console.log("category", category);
    console.log("keywords", keywords);

    const res = await fetch('https://kamenz.stepzen.net/api/alliterating-toad/__graphql', {
        method: 'POST',
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? { revalidate: 0 } : { revalidate: 60 },
        headers: {
            "Content-Type": "application/json",
            Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
        },
        body: JSON.stringify({
            query,
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY,
                categories: category,
                keywords: keywords
            },
        })
    }
    )

    const newsResponse = await res.json();

    // console.log("newsResponse:", newsResponse.data.myQuery);
    console.log("fetchNews");


    const news = sortNewsByImage(newsResponse.data.myQuery);

    return news
    // return null

}

export default fetchNews

