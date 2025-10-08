export default {
  async fetch(request) {
    return new Response("Hello World from Worker!", {
      headers: { 'content-type': 'text/plain' },
    });
  },
};