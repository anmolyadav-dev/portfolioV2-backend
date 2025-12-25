const requests = new Map();

const WINDOW_MS = 15 * 60 * 1000 ; //15 minutes in milliseconds
const MAX_REQUESTS = 10;

export default function rateLimit(req , res , next){
    const ip = req.ip;
    const now = Date.now()

    const record = requests.get(ip) || {count:0, start:now}

    if (now - record.start > WINDOW_MS){
        requests.set(ip, {count:1 , start:now})
        return next();
    }

    if (record.count >= MAX_REQUESTS){
        return res.status(429).json({
            error:'Too many request, try again after some time'
        })
    }
    record.count++;
    console.log(record);
    requests.set(ip,record)
    next();
}