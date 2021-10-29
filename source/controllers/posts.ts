/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { MongoClient } from "mongodb";
import { Character, Episode, EpisodeAPI, CharacterAPI } from "./types";

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

const getStatus = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        Status: 200,
        Body: "OKProgramacion-I"
    });
};

// getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const uri = "mongodb+srv://pruizj:1234paula@cluster-nebrija.fombo.mongodb.net/Paula?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    client.connect().then(async () => {
        console.log("Me he conectado a la base de datos");

        let result = await client.db("Paula").collection("personajes").find().toArray();

        //Format
        const allcharacters = result.map((result) => {
            const { id, name, status, species, episode } = result;
            return {
                id,
                name,
                status,
                species,
                episode: episode.map((epi: Episode) => {
                    return {
                        name: epi.name,
                        episode: epi.episode,
                    }
                }),
            }
        });

        return res.status(200).json({
            Status: 200,
            Body: allcharacters
        });
    }).catch((e) => {
        console.log(e);
    })
};

// getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const uri = "mongodb+srv://pruizj:1234paula@cluster-nebrija.fombo.mongodb.net/Paula?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    let identifier: string = req.params.id;
    const valor: number = +identifier;

    client.connect().then(async () => {
        console.log("Me he conectado a la base de datos");

        const resu = await client.db("Paula").collection("personajes").find({ id: valor }).toArray();

        if (resu) {
            
            //Format
            const singlecharacter = resu.map((result) => {
                const { id, name, status, episode } = result;
                return {
                    id,
                    name,
                    status,
                    episode: episode.map((epi: Episode) => {
                        return {
                            name: epi.name,
                            episode: epi.episode,
                        }
                    }),
                }
            });

            return res.status(200).json({
                Status: 200,
                Body: singlecharacter
            });

        } else {
            return res.status(200).json({
                Status: 404,
                Body: "Not Found"
            });

        }
    }).catch((e) => {
        console.log(e);
    })

};

// updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const uri = "mongodb+srv://pruizj:1234paula@cluster-nebrija.fombo.mongodb.net/Paula?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    let identifier: string = req.params.id;
    const valor: number = +identifier;
    let change_status: string = "unknown";

    client.connect().then(async () => {
        console.log("Me he conectado a la base de datos");

        const result = await client.db("Paula").collection("personajes").findOne({ id: valor });

        if (result) {

            //Find status
            Object.keys(result).forEach((k: string) => {
                if (k == "status") {
                    change_status = `${(result)[k]}`;
                }
            });

            //Change status
            if (change_status == "Alive") {
                change_status = "Dead";
            } else if (change_status == "Dead") {
                change_status = "Alive";
            }

            //Update status
            const filter = { id: valor };
            const updatePost = {
                $set: {
                    status: change_status
                }
            };
            let result_status_change = await client.db("Paula").collection("personajes").findOneAndUpdate(filter, updatePost);
            
            //Format
            let resu = await client.db("Paula").collection("personajes").find({ id: valor }).toArray();
            const updatecharacter = resu.map((result) => {
                const { id, name, status, episode } = result;
                return {
                    id,
                    name,
                    status,
                    episode: episode.map((epi: Episode) => {
                        return {
                            name: epi.name,
                            episode: epi.episode,
                        }
                    }),
                }
            });

            return res.status(200).json({
                Status: 200,
                Body: updatecharacter
            });

        } else {

            return res.status(200).json({
                Status: 404,
                Body: "Not Found"
            });

        }
    })
};

// deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const uri = "mongodb+srv://pruizj:1234paula@cluster-nebrija.fombo.mongodb.net/Paula?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    let identifier: string = req.params.id;
    const valor: number = +identifier;

    client.connect().then(async () => {
        console.log("Me he conectado a la base de datos");
        let result = await client.db("Paula").collection("personajes").findOne({ id: valor });
        if (result) {
            let result = await client.db("Paula").collection("personajes").deleteOne({ id: valor });
            return res.status(200).json({
                Status: 200,
                Body: "OK"
            });
        } else {
            return res.status(200).json({
                Status: 404,
                Body: "Not Found"
            });
        }
    })

};

export default { getPosts, getPost, updatePost, deletePost, getStatus };