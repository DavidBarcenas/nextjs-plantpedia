<div align="center">
  <img src="./.readme-static/logo.png" alt="Plantpedia">
</div>

***

<p align="center">Next.js saga project where a static plant site was developed, with more than 400 entries in Contentful CMS to better understand the development of a real site and apply professional strategies.</p>

<p align="center">
  🐞 <a href="https://github.com/DavidBarcenas/nextjs-plantpedia/issues">Report a Bug</a> 
  🙋‍♂️ <a href="https://github.com/DavidBarcenas/nextjs-plantpedia/issues">Request Feature</a>
</p>


# Preview
![App screenshot](./.readme-static/app.jpg)

Screenshots: 
[Home](./.readme-static/home.png) 
[Post](./.readme-static/post.png) 
[Top Stories](./.readme-static/top-stories.png) 
[Search](./.readme-static/search.png)

# The Project
Next.js' career is focused on creating professional sites from concept to production. I leave a list with some of the most important topics of each course.

- Use all rendering modes
- Understand how to configure routers, content previewers, and responsive images
- Error page customization
- Shalow navigation
- Architecture patterns for internationalization and localization in JavaScript
- Implement i18n in React.js
- Handling large amounts of data
- Avoid unnecessary renderings

# Features

- Integrate the Contentful CMS API into Next.js
- Good optimization practices for static sites
- Using Graphql and its code generator
- Image optimization with Next.js and Contentful CMS
- User language detection and redirect based on language
- Use throttling and debouncing
- Revalidation cache to improve load times

# Running the app

## Installation

```bash
git clone https://github.com/DavidBarcenas/nextjs-plantpedia.git
cd nextjs-plantpedia
# if you use npm
npm install
# if you use yarn
yarn install
```

## Development
`next dev` starts the application in development mode with active code reloading, bug reports, and more.

The application will start at `http://localhost:3000` by default.


## Build
`next build` creates an optimized production build of your application. The output shows information about each route.

## Run the application in production mode
`next start` starts the application in production mode. The application must first be compiled with: `next build`

# Notes

Don't forget to set your environment variables. In the project there is a file called **.env.local.example** there it has all the variables you will need.\
It will also be necessary that you have an account created in [Contentful CMS.](https://www.contentful.com/)

# License
Released under the  [MIT licensed](LICENSE).\
Feel free to fork this project and improve it. Give a ⭐️ if you like this project!