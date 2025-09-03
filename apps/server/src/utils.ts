export async function delay(ms: number = 500) {
  await new Promise(resolve => setTimeout(resolve, ms));
}
