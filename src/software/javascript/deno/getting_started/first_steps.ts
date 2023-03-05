// 1.Hello world
// deno run first_steps.ts
// Code
// console.log('Welcome to Deno')

// 2. Hello World with external example
// deno run https://deno.land/std@0.103.0/examples/welcome.ts

// 3.Making an HTTP Request
// 3.1 deno run first_steps.ts https://yirenlu.com/
// 3.2 deno run https://deno.land/std@0.166.0/examples/curl.ts https://example.com
// 3.3 deno run --allow-net=yirenlu.com first_steps.ts https://yirenlu.com/
// 3.4 deno run --allow-net=example.com https://deno.land/std@0.166.0/examples/curl.ts https://example.com
// Code
// const url = Deno.args[0]
// const res = await fetch(url)
// const body = new Uint8Array(await res.arrayBuffer())
// await Deno.stdout.write(body)

// 4. Reading a file
// deno run --allow-read https://deno.land/std@0.166.0/examples/cat.ts /etc/hosts
// import { copy } from 'https://deno.land/std@0.166.0/streams/conversion.ts'
// const filenames = Deno.args
// for (const filename of filenames) {
//     const file = await Deno.open(filename)
//     await copy(file, Deno.stdout)
//     file.close()
// }

// 5. Putting it all together in an HTTP server
import { serve } from "https://deno.land/std@0.166.0/http/server.ts"

const port = 8080

const handler = async (request: Request): Promise<Response> => {
  const resp = await fetch("https://api.github.com/users/denoland", {
    // The init object here has an headers object containing a
    // header that indicates what type of response we accept.
    // We're not specifying the method field since by default
    // fetch makes a GET request.
    headers: {
      accept: "application/json",
    },
  })
  console.log('request', request)
  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "content-type": "application/json",
    },
  });
};

console.log(`Listening on http://localhost:${port}`)
serve(handler)