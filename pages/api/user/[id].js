import prisma from "../../../lib/prisma"

export default function handler({ query: { id } }, res) {
    // if (req.method === 'GET') {
        handleGet(parseInt(id, 10), res)
    // } 
}

async function handleGet(id, res) {
    let user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
            scheduledRuns: {
                include: {
                    completedRun: true
                }
            }
        },
      });
    res.json(user)
}
