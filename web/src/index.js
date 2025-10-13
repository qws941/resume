export default {
  async fetch() {
    return new Response('Hello World from Worker!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};