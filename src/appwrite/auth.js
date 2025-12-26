import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'


export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.APPWRITE_PROJECT_ID);
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create({
                id: ID.unique(),
                email,
                password,
                name
            })
            if (userAccount) {
                //Calling method to login
                return this.login({ email, password })
            }
            else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite service :: CreateAccount :: error", error)
            return false;
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({ email, password })
        }
        catch (error) {
            console.log("Appwrite service :: Login :: error", error)
            return false;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.log("Appwrite service :: GetCurrentUser :: error", error)
            return false;
        }
    }
    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
            return false;
        }
    }
}

const authService = new AuthService();

export default authService
