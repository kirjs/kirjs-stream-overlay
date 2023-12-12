import { firestore } from './firestore';

export async function getToken(id: string) {
  const val = await firestore.doc('config/tokens').get();
  return val.data().tokens.find((i: any) => i.name === id).value;
}
