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
        query: 'query listRepo { listRepo { name size owner __typename } }',
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
          return data?.data.listRepo;
        })
        .catch((error) => {
          console.error(error);
        });
    }catch(error){
      console.log("error : ",error);
    }
  }

  async getRepoDetailsByGraphql(param:any){
    try{      
      const graphqlQuery = {
        query: 'query RepoDetails($repoName: String!) { repoDetails(repoName: $repoName) { name private fileCount owner size isWebhook ymlContent __typename } }',
        variables : {
          "repoName": param
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
          return data?.data.repoDetails;
        })
        .catch((error) => {
          console.error(error);
        });
    }catch(error){
      console.log("error : ",error);
    }
  }
}
