
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
const port = 4000;
const app = express();
const httpServer = http.createServer(app);

export async function startAppoloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (formattedError) => {
            return {
                formattedError,
                message: "Your query doesn't match the schema. Try double-checking it!",
            };
        },
    });

    await server.start();

    app.use(cors(), bodyParser.json(), expressMiddleware(server));

    await new Promise<void>((resolve) => {
        httpServer.listen({ port }, () => {
            console.log(`🚀  Server ready at ${port}`);
            resolve();
        });
    });
}

