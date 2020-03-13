const postBaseUrl = 'http://lol-matching-dev.us-west-2.elasticbeanstalk.com/api';

export function getMatchFromApi (userId) {
    let url = `${postBaseUrl}/match`;

    url += `?name=${userId}`;

    console.log(`Making POST request to ${url}`);

    return fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });

}

export function sendMatchRequest(userName){

}
