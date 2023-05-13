import { hash, compare } from 'bcryptjs'

const encrypter = async (textPlane: string): Promise<string> => {
  const textHash = await hash(textPlane, 8)
  return textHash
}

const verified = async (textPlane: string, textHash: string): Promise<boolean> => {
  const isCorrect = await compare(textPlane, textHash)
  return isCorrect
}

export {
  encrypter,
  verified
}
