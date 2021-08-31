import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import random from 'lodash/random'

const premium: NextApiHandler = async (request, response) => {
  const session = await getSession({req: request})

  if(!session) {
    response.status(401).end()
    return
  }

  response.status(200).json({
    data: `https://randomfox.ca/images/${random(1, 122)}.jpg`,
    time: new Date().getTime(),
  })
}
export default premium