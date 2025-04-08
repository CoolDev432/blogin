import { Client, Databases } from 'appwrite';
const client = new Client();
client.setProject('67c6cc46002a7e9a37f2');
client.setEndpoint('https://cloud.appwrite.io/v1')

const database = new Databases(client)

export default database