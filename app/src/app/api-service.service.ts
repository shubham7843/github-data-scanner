import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
// import { Apollo } from 'apollo-angular';
// import { GET_REPOS } from './graphql-queries';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  async getPublicRepositoriesByGraphql(){
    try{      
      const graphqlQuery = {
        query: 'query Repositories { repositories { name size owner __typename } }',
      };
      return fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data?.data.repositories;
        })
        .catch((error) => {
          console.error(error);
        });
    }catch(error){
      console.log("error : ",error);
    }
  }

  async getRepoDetailsByGraphql(owner:any,name:any){
    try{      
      const graphqlQuery = {
        query: 'query RepositoryDetails($owner: String!, $name: String!) { repositoryDetails(owner: $owner, name: $name) { name isPrivate numFiles owner size activeWebhooks ymlContent __typename } }',
        variables : {
          "owner": owner,
          "name": name
        }
      };
      return fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data?.data.repositoryDetails;
        })
        .catch((error) => {
          console.error(error);
        });
    }catch(error){
      console.log("error : ",error);
    }
  }
}
