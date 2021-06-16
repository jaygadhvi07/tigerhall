import ImageNext from 'next/image'
import { useEffect, useState } from "react"
// Here we are usign chakra UI
import { Stack, Flex, Input, Text, Box, Image } from "@chakra-ui/react"
import getPodcastData from "./api/podcasts"
import LoadingBalls from "../public/assets/images/loading-circle.gif"
import _ from "lodash"

export default function Home() {

	const [podcasts, setPodcasts] = useState([])
	const [keyword, setKeyword] = useState("")
	const [loading, setLoading] = useState(false)

	const resize = ".com/resize/250x"

	const getPodcasts = async (keyword) => {

		const data = await getPodcastData(keyword)
		setPodcasts(data.edges)
		setLoading(false)
	}

	const inputHandler = (e) => {

		// Loading
		setLoading(true)

		// Debouncing Here...
		const debounce = _.debounce(function () {
			console.log('Function debounced after 1000ms!');
			setKeyword(e.target.value)
		}, 300);

		debounce()
	}

	useEffect(() => {
		getPodcasts(keyword)
	}, [keyword])

	return (
		<Stack>
			<Flex backgroundColor="#001315" alignItems="center" justifyContent="center">
				<Flex direction="column" marginTop="25px" padding="50px">
					<Text fontSize="md" color="White" width={[300, "sm"]} fontWeight="500">Search</Text>
					<Input onChange={(e) => inputHandler(e)} marginTop="10px" placeholder="Type any keyword" backgroundColor="#003238" color="white" border="none" />
					<Stack>
						{
							loading ? <Stack><Box height="50px"></Box><ImageNext src={LoadingBalls} width="250px" height="250px" objectFit="cover" /></Stack> :
								podcasts && podcasts.map((item, index) => (
									<Box key={index} marginTop="25px" maxW="sm" borderRadius="lg" overflow="hidden">
										<Image src={item.image.uri && item.image.uri.split(".com", 3)[0] + resize + item.image.uri.split(".com", 3)[1]} alt={item.name} height="170px" width="100%" objectFit="cover" />

										<Box p="4" bg="white">
											<Text fontWeight="600" color="#FF8615">
												{item.categories[0].name && item.categories[0].name}
											</Text>


											<Text fontSize="larger" fontWeight="bold">
												{item.name && item.name}
											</Text>


											<Text fontWeight="400">
												{item.experts.length > 0 && item.experts[0].firstName + " " + item.experts[0].lastName}
											</Text>

											<Text fontWeight="500">
												{item.experts.length > 0 && item.experts[0].title}
											</Text>

											<Text color="#FF8615" fontWeight="600">
												{item.experts.length > 0 && item.experts[0].company}
											</Text>
										</Box>
									</Box>
								))
						}
					</Stack>
				</Flex>
			</Flex>
		</Stack >
	)
}
