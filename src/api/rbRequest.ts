import {convertBase64toUtf8} from "../helpers/textConversion.ts";
import {api} from "../helpers/kyConfig.ts";

export interface RbRequest {
  id: string
  method: string
  content?: string
  sourceIp: string
  responseCode: number
  timestamp: Date
}


export async function GetRequests(): Promise<RbRequest[]> {
  const rtnMe = await api.get("v1/requests",).json<RbRequest[]>();

  rtnMe.forEach(r => {
    if (!r.content) {
      r.content = "empty"
    }
    r.content = convertBase64toUtf8(r.content)
    r.timestamp = new Date(r.timestamp)
  })

  return rtnMe.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}