// Inlcude playwright module
import {expect } from '@playwright/test';
import endpoint from '../config/endpoint';


// create cl
export default class FilteringApiEndpoint {
        constructor(baseURL) {
            this.baseURL = baseURL;
        }
    
        async getFilteringDetailsApi(filterOption,headers = {},) {
            try {
                const apiURL = this.baseURL + `${endpoint.endpoints.filteringapi}`+"?filterType="+filterOption;
                const response = await fetch(`${apiURL}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...headers
                    }
                   
                });
            return response;
            } catch (error) {
                console.error("Error in POST request:", error);
                throw error; // Re-throw for handling
            }
        }
    }
    
   
    


