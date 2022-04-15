import prisma from "../../lib/prisma"

export default function handler(req, res) {
    if (req.method === 'POST') {
        handlePost(req, res)
    }
}

async function handlePost(req, res) {
    const completedRun = await prisma.completedRun.create({
        data: req.body
    })
    res.json(completedRun)
}