export const backendUrl = "http://localhost:3000"

export const Status = {
  TODO: "TODO",
  DOING: "DOING",
  DONE: "DONE",
}

export const Category = {
  ETUDE_FONDS_MARINS: "ETUDE_FONDS_MARINS",
  BIOLOGIE_MARINE: "BIOLOGIE_MARINE",
  CONSERVATION_MARINE: "CONSERVATION_MARINE",
}

export type StatusType = (typeof Status)[keyof typeof Status]

export type CategoryType = (typeof Category)[keyof typeof Category]

export type TicketApi = {
  id: string
  code: string
  description: string
  status: StatusType
  category: CategoryType
  projectId: string | null
}

export type ProjectApi = {
  id: string
  name: string
  tickets: TicketApi[]
}

export type Ticket = TicketApi & {
  color: string
}

export type Project = Omit<ProjectApi, "tickets"> & {
  TODO: Ticket[]
  DOING: Ticket[]
  DONE: Ticket[]
}

const errorDealing = (response: Response) =>
  response.json().then((data) => {
    if (!response.ok) {
      throw new Error(JSON.stringify(data))
    }
    return data
  })

export async function postRequest<T>(url: string, payload: T) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(errorDealing)
}

export async function deleteRequest(url: string) {
  return fetch(url, {
    method: "DELETE",
  }).then(errorDealing)
}

export async function getRequest(url: string) {
  return fetch(url).then(errorDealing)
}
