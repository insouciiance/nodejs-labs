import { RedisKey } from "ioredis";
import { redisClient } from "../app";;

const DEFAULT_EXPIRATION = 3600

export function getOrSetCache(key: RedisKey, callback: { (): any; (): any; }) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) return reject(error)
            if (data != null) return resolve(JSON.parse(data))
            const freshData = await callback()
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
            resolve(freshData)
        })
    })
}