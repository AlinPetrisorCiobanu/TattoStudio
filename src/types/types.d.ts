export interface JwtPayload{
    id: String,
    email: String,
    name:String,
    rol: String,
    iat: EpochTimeStamp
  }