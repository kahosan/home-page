export interface Service {
  name: string
  path: string
  description: string
  icon: string
}

interface ServiceGroup {
  name: string
  services: Service[]
}
