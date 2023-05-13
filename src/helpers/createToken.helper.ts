import { randomUUID } from 'crypto'
const createToken = (): string => randomUUID()
export default createToken
