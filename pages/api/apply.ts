
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }
  const body = req.body;
  console.log('[AARNA HostStar Demo] Application received:', body);
  return res.status(200).json({ ok: true, received: { ...body, receivedAt: new Date().toISOString() } });
}
