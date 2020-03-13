const postBaseUrl = 'http://lol-matching-dev.us-west-2.elasticbeanstalk.com/api';

export function getCommentFromApi (userId) {
    let url = `${postBaseUrl}/reviews`;

    url += `?reviewee=${userId}`;

    console.log(`Making GET request to ${url}`);

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

export function createCommentFromApi (reviewer, reviewee, text){
    let url = `${postBaseUrl}/review`;

    console.log(`Making POST request to ${url}`);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewer,
          reviewee,
          text
        })
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.json();
    });

}
