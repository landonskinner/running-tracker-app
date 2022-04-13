import prisma from "../../lib/prisma"

export default function handler(req, res) {
    if (req.method === 'POST') {
        handlePost(req, res)
    }
}

async function handlePost(req, res) {
    const scheduledRun = await prisma.scheduledRun.create({
        data: req.body
    })
    res.json({'run': 'scheduled'})
}