import axios from 'axios';

export class YelpAPIController {
    private static yelpAPIURL: string = 'https://api.yelp.com/v3';
    private static apiKey: string;

    public static init({ apiKey }: { apiKey: string }) {
        YelpAPIController.apiKey = apiKey;

    }

    public static async search(search: string, location: string) {
        const businesses = await axios.get(`${YelpAPIController.yelpAPIURL}/businesses/search?location=${location}&term=${search}`, {
            headers: {
                Authorization: `Bearer ${YelpAPIController.apiKey}`
            }
        })
        .then(({ data }) => data)
        .catch((err) => console.log(err.response.data))

        return businesses;
    }

    public static async reviews(id: string) {
        const businesses = await axios.get(`${YelpAPIController.yelpAPIURL}/businesses/${id}/reviews`, {
            headers: {
                Authorization: `Bearer ${YelpAPIController.apiKey}`
            }
        })
        .then(({ data }) => data)
        .catch((err) => console.log(err.response.data))

        return businesses;
    }
}