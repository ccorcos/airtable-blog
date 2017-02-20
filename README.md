# Airtable Blog

This project demonstrates using [Next.js](https://github.com/zeit/next.js) to server-side render markdown in React using the [`markdown-it-renderer`](https://github.com/ccorcos/markdown-it-renderer), and hosting all of the blog posts on [Airtable](airtable.com).

Admittedly, there are some hacks going on here, but the point is to create a proof of concept for a simple microservice with a low amount of developer maintainence.

Furthermore, `markdown-it-renderer` is built in such a way that you should be able to create you're own custom components and render them in markdown. More on that soon...

## Getting Setup



- create a base with a table called "Posts"
  - create "Markdown" Long Text field
  - create a "Date Published" date field
- generate an api key here: https://airtable.com/account
- go here and get the base name: - https://airtable.com/appuNKawr4rf3Mnav/api/docs
- create a file called env.sh with this information
    ```sh
    export AIRTABLE_API_KEY='XXX'
    export AIRTABLE_BASE_NAME='XXX'
    export PASSWORD='XXX'
    ```

# TODO

- client side navigation
- deploy with now
- better readme
- markdown widgets