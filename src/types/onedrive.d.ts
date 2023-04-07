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

export interface ResourceError {
  error: {
    code: string
    message: string
    innererror: {
      code: string
    }
  }
}

export interface UploadResponse {
  '@odata.context': string
  '@microsoft.graph.downloadUrl': string
  createdDateTime: string
  cTag: string
  eTag: string
  id: string
  lastModifiedDateTime: string
  name: string
  size: number
  webUrl: string
  reactions: {
    commentCount: number
  }
  createdBy: {
    application: {
      displayName: string
      id: string
    }
    user: {
      displayName: string
      id: string
    }
  }
  lastModifiedBy: {
    application: {
      displayName: string
      id: string
    }
    user: {
      displayName: string
      id: string
    }
  }
  parentReference: {
    driveId: string
    driveType: string
    id: string
    path: string
  }
  file: {
    mimeType: string
    hashes: {
      quickXorHash: string
      sha1Hash: string
      sha256Hash: string
    }
  }
  fileSystemInfo: {
    createdDateTime: string
    lastModifiedDateTime: string
  }
}
