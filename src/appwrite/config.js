import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client()
    database;
    bucket;
    constructor() {
        this.client = this.client.setEndpoint(conf.appwriteUrl).setProject(conf.APPWRITE_PROJECT_ID)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {

            return await database.createDocument({
                databaseId: conf.APPWRITE_DATABASE_ID,
                collectionId: conf.APPWRITE_COLLECTION_ID,
                documentId: slug,
                data: {
                    title, content, featuredImage, status, userId
                },
            });
        } catch (error) {
            console.log("Appwrite service :: CreatePost :: error", error)
            return false;
        }

    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await database.updateDocument({
                databaseId: conf.APPWRITE_DATABASE_ID,
                collectionId: conf.APPWRITE_COLLECTION_ID,
                documentId: slug,
                data: {
                    title, content, featuredImage, status
                },
            });
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
            return false;
        }
    }
    async deletePost(slug) {
        try {
            await database.deleteDocument({
                databaseId: conf.APPWRITE_DATABASE_ID,
                collectionId: conf.APPWRITE_COLLECTION_ID,
                documentId: slug,
            });
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false;
        }
    }
    async getPost(slug) {
        try {
            return await database.getDocument({
                databaseId: conf.APPWRITE_DATABASE_ID,
                collectionId: conf.APPWRITE_COLLECTION_ID,
                documentId: slug,
            });
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await database.listDocuments({
                databaseId: conf.APPWRITE_DATABASE_ID,
                collectionId: conf.APPWRITE_COLLECTION_ID,
                queries
            });
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error)
            return false;
        }
    }
    //file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.APPWRITE_BUCKET_ID,
                fileId: ID.unique(),
                file
            });
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            return await bucket.deleteFile({
                bucketId: conf.APPWRITE_BUCKET_ID,
                fileId
            });

        } catch (error) {
            console.log("Appwrite service :: deketeFile :: error", error)
            return false;
        }
    }
    getFilePreview(fileId) {
        return this.bucket.getFilePreview({
            bucketId: conf.APPWRITE_BUCKET_ID,
            fileId: fileId,
        });
    }
}

const service = new Service();
export default service