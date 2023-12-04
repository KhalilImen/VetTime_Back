import * as auth from './auth'
import * as Supadmin from './Supadmin'
import * as admin from './admin'
import * as guest from './guest'
import * as client from './client'
import * as agent from './agent'
export default {
    ...auth,
    ...Supadmin,
    ...admin,
    ...guest,
    ...client,
    ...agent,

}