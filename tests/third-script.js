import http from 'k6/http';
import check from 'k6';
export const options = {
  discardResponseBodies: true,
  scenarios: {
    firsttag: {
      executor: 'constant-vus', // this executor is the most basic which gives constant virtual user for a specified duration
      exec: 'firsttag',
      vus: 10,
      duration: '10s',
    },
    secondtag: {
      executor: 'ramping-vus', //this executor allows to achieve a ramp up and ramp down and multiple stages
      exec: 'secondtag',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 10 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
  thresholds: {
    'http_req_duration{scenario:firsttag}': ['p(90)<400', 'p(99)<500'],
    'http_req_duration{scenario:secondtag}': ['p(90)<500', 'p(99)<500'],
  },
};

export function firsttag() {
    const res = http.get('https://postman-echo.com/get?foo1=bar1&foo2=bar2', {
        tags: { my_custom_tag: 'firsttag' },
    });
}

export function secondtag() {
    const res = http.get('https://postman-echo.com/get?foo3=bar3&foo4=bar4', {
        tags: { my_custom_tag: 'secondtag' },
    });
}
