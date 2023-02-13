export interface RequestTokenError {
  error: string
  error_description: string
  error_codes: number[]
  timestamp: string
  trace_id: string
  correlation_id: string
  error_uri: string
}

export interface RequestTokenResponse {
  access_token: string
  expires_in: number
  ext_expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}