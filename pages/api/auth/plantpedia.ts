import type { NextApiHandler } from 'next';

const credentialsAuth: NextApiHandler<User> = (request, response) => {
  if(request.method !== 'POST') {
    response.status(405).end()
    return
  }

  const {username, password} = request.body
  console.log(username, password)

  if(username === process.env.AUTH_PLANTPEDIA_USERNAME && 
    password === process.env.AUTH_PLANTPEDIA_PASSWORD) {
    const user: User = {
      name: 'Daveepro',
      email: 'davee@mail.com',
      image: ''
    }

    return response.status(200).json(user)
  }

  response.status(401).end()
}

export default credentialsAuth