import { JWTPayload, jwtVerify, SignJWT } from "jose";
import dotenv from "dotenv";
import { createDefine } from "fresh";

export interface State {
  shared: string;
}
export const define = createDefine<State>();

dotenv.config();

const jwtsecret = Deno.env.get("JWT_SECRET")
const secret = new TextEncoder().encode(jwtsecret);

export async function createJWT(payload: JWTPayload): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return jwt;
}

export async function verifyJWT(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}

export const checkAuth = async (userid:string,token:string):Promise<boolean>=> {
   if (!userid || !token) {
            return false
        } 
        if(token){
            const userlegit =await verifyJWT(token)
            if (userlegit){
                return true;
            }
        }
        return false;
}


