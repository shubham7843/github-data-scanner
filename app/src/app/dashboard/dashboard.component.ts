import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  profile:boolean = false
  repo:boolean = true
  repoDetails:boolean = false
  isLoading:boolean = true;

  public userDetails: any;
  public publicRepositories: any;
  public completeRepoDetails: any;

  constructor(private apiService : ApiServiceService) { }

  async ngOnInit(){
    console.log("ngOnInit called");
    this.publicRepositories = await this.apiService.getPublicRepositoriesByGraphql();
    this.isLoading = false;
    console.log("this.publicRepositories : ",this.publicRepositories); 
  }

  showProfile(){
    console.log("showProfile");
    this.repo = true
    this.profile = true
    this.repoDetails = false;
  }

  async getRepoDetailsByGraphql(owner:any,name:any){
    this.repo = false
    this.profile = false
    this.repoDetails = true;
    this.isLoading = true;
    this.completeRepoDetails = null;
    console.log("getRepoDetailsByGraphql : ",name);
    this.completeRepoDetails = await this.apiService.getRepoDetailsByGraphql(owner,name);
    this.isLoading = false;
    console.log("this.completeRepoDetails : ",this.completeRepoDetails);
 }
}
