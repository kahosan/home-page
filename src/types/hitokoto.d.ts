export interface HitokotoRespones {
  id: number
  uuid: string
  hitokoto: string
  type: string
  from: string
  from_who: any
  creator: string
  creator_uid: number
  reviewer: number
  commit_from: string
  created_at: string
  length: number
}

export interface RequestError {
  message: string
}
