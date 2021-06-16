import { gql } from "@apollo/client"
import client from "../../apollo-client"

async function getPodcastData(keyword = "") {
    const { data } = await client.query({
        query: gql`{
		contentCards(filter: {limit: 20, keywords: "${keyword}", types: [PODCAST]}) { edges {
			... on Podcast { name
			image {
			...Image
			}
			categories {
			...Category
			}
			experts {
			...Expert
			}
			}
			}
			}
			}
			
			fragment Image on Image { uri
			}
			
			fragment Category on Category { name
			}
			
			fragment Expert on Expert { firstName
			lastName title company
			}`,
    })

    return data.contentCards
}

export default getPodcastData