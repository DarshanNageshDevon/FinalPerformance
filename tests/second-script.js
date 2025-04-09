import encoding from 'k6/encoding';
import http from 'k6/http';
import { sleep, check } from 'k6';
export const options = {
    stages: [{ target: 2, duration: '10s' }],
    thresholds: {
    http_req_duration: ['p(90)<750', 'p(99)<1500'],
    },
};

const username = 'postman';
const password = 'password';
export default function () {
    const credentials = `${username}:${password}`;
    const encodedCredentials = encoding.b64encode(credentials);
    const options = {
    headers: {
        Authorization: `Basic ${encodedCredentials}`,
        },
    };

    const res = http.get(`https://postman-echo.com/basic-auth`, options);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
