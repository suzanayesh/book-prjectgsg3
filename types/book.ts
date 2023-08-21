import express from 'express';
namespace Book {
    export interface Book {
        id: number,
        title: string,
        author: string,
        publicationYear: number
    }

    export interface Request extends express.Request{
        body: {
            title: string,
            author: string,
            publicationYear: number
        },
        query: {
            page: string,
            pageSize: string,
            name: string,
            year: string,
            sortBy: string
        }

    }

    export interface Response extends express.Response{
        send: (body: string|{
            page: number,
            pageSize: number,
            total: number,
           books: Book[];
        }) =>this
    }


}

export default Book;