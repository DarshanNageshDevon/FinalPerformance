import { check } from 'k6';
import http from 'k6/http';

export const options = {
  stages: [{ target: 10, duration: '10s' }],
  thresholds: {
    http_req_duration: ['p(90)<250', 'p(99)<250'],
  },
};

const payload = 'this is expected to be sent back';
export default function() {
    const resp = http.post('https://postman-echo.com/post', payload);
    // check(resp, { 'status is 200': (r) => r.status === 200 });
    check(resp, { 'content is correct': (r) => r.body.includes(payload) });
}
