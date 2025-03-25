import type {RbRequestHeader} from "../api/rbRequest.ts";


export function FormatContent (headers :RbRequestHeader[], content :string ) {
  const contentType = headers.find(h => h.name === 'Accept')
  if (!contentType) return content

  const type = contentType.value

  if (type.includes('json')) return JSON.stringify(JSON.parse(content), null, 2)
}